# Web Scraper baseado em python para o projeto de Automação do Senai ITABIRA.
# É utilizado a ferramenta HTML Requests para analisar o site de clima do Google.
# Código original em: https://github.com/S3EMi/Irrigacao-Python-Arduino

import datetime
from requests_html import HTMLSession
import time
from pyfirmata import Arduino, util, SERVO, STRING_DATA
import os
import gspread

# Estabelece as funções para editar a planilha do Google Sheets
sa = gspread.service_account(filename = "service_account.json")
sh = sa.open("PythonSensors")

wks = sh.worksheet("SensData")

hoje = datetime.date.today()

# Função para limpar o console
def clearConsole():
    os.system('cls')

# Estabelecer o port do Arduino para comunicação e controle.
port = input("Porta COM Arduino: ")
board = Arduino(port)

# Determina os parâmetros iniciais para o pesquisador de Internet
s = HTMLSession()
query = input("Localização: ")
thresh = input("Limite para comparação do sensor: ")

# Transforma o site no formato HTML e pega as informações necessárias
url = f'https://www.google.com/search?q=weather+{query}'
r = s.get(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36'})
title = r.html.find('span.BBwThe', first=True).text
prec = r.html.find('div.wtsRwe', first=True).find('span#wob_pp', first=True).text.rstrip("%")
prec = int(prec)

# No site falava que era bom começar um Iterator pois de acordo com a documentação do Pyfirmata,
# "Para usar portas analógicas, provavelmente é útil iniciar um thread do iterador.
# Caso contrário a placa continuará enviando dados para sua serial, até que ela transborde"
# Ou seja, esses parâmetros servem como limite para não sobrecarregar a placa ARDUINO de informações.
it = util.Iterator(board)
it.start()
time.sleep(0.05)

# Define o estado do pino analógico 0 para enviar informações.
board.analog[0].enable_reporting()
# Define uma lista para os relés
relayList = [11, 10, 9, 8, 7, 6]
boardNum = 0

# Coloca cada pino analógico para mandar informações
print("\n------------ Pin reporting ------------")
while boardNum < 6:
    try:
        board.analog[boardNum].enable_reporting()
        print("Pin number " + str(boardNum) + " ............... OK")
        boardNum = boardNum + 1
    except:
        print("Pin number " + str(boardNum) + " ............... ERROR")
        boardNum = boardNum + 1
    else:
        time.sleep(0.5)
        continue
print("---------------------------------------")

time.sleep(1)
print("\n")

boardNum = 0
readDataFromPin = board.analog[boardNum].read()
pinList = []
dataList = []

# Verifica quais pinos estão mandando informações e os adicionam a uma lista
print("\n------------ Pin listing ------------")
while boardNum < 6:
    readDataFromPin = board.analog[boardNum].read()
    readDataFromPin = readDataFromPin * 1000
    if readDataFromPin < 2:
        print("Pin " + str(boardNum) + " is inactive.")
        boardNum = boardNum + 1
        time.sleep(1)
    else:
        print("Inserted pin number " + str(boardNum) + " into list with value " + str(readDataFromPin))
        pinList.insert(1, boardNum)
        boardNum = boardNum + 1
        time.sleep(1)
print("\nActive pins: " + str(pinList))
print("--------------------------------------")

chcPin = 0
sheetsCol = ["B2", "B3", "B4", "B5", "B6", "B7"]
relayCol = ["C2", "C3", "C4", "C5", "C6", "C7"]
print("\n")
time.sleep(3)
clearConsole()

# Equivalente ao void loop();
while True:
    # Pega as informações de temperatura e precipitação. Está dentro do loop para ser atualizado constantemente.
    # As informações são encontradas através da pesquisa de class's e span's, pois pode haver mais de um de cada.
    # A função .text retira apenas o texto daquela função, e o .rstrip retira a porcentagem do valor de precipitação
    # a fim de ser mudada para um valor float.
    temp = r.html.find('span#wob_tm', first=True).text
    prec = r.html.find('div.wtsRwe', first=True).find('span#wob_pp', first=True).text.rstrip("%")
    prec = int(prec)

    # Pra cada pino na lista, lê as informações do mesmo
    for x in pinList:
        currPin = pinList[chcPin]
        currRelay = relayList[currPin]

        currCol = str(sheetsCol[currPin])
        currRelayCol = str(relayCol[currPin])

        calc1 = board.analog[currPin].read()
        calc2 = calc1 * 1000
        calc3 = int(100 - ((calc2/1023)*100))

        if calc3 <= int(thresh) and prec <= 70:
            board.digital[currRelay].write(0)
            msg = "RELE LIGADO"
            chcPin = chcPin + 1
            time.sleep(1)
        else:
            board.digital[currRelay].write(1)
            msg = "RELE DESLIGADO"
            chcPin = chcPin + 1
            time.sleep(1)
        # É necessário de definir valores para "string" para que possam ser mostrados no display
        # Já que o comando STRING_DATA// não permite mais de uma parâmetro, juntamos todos os caracteres em
        # uma única variável.
        data1 = "Precipit.: " + str(prec) + "%"
        data2 = "Temp: " + str(temp) + " C"
        data3 = "Um Sens " + str(currPin) + ": " + str(calc3) + "%"
        data4 = msg

        # Mostra na janela Python
        print(title)
        print("\n" + str(prec), "%", " de precipitação")
        print("Umidade sensor " + str(currPin) + ": " + str(calc3) + "%")
        print("Relé " + str(currRelay) + " " + str(msg))
        print("\nCTRL+C to terminate program.")

        # Insere uma linha na planilha do Sheets com os valores
        wks.update(str(currCol), str(calc3))
        wks.update(str(currRelayCol), str(msg))
    
        # Imprimem os valores DATA definidos anteriormente no LCD do Arduíno.
        board.send_sysex(STRING_DATA, util.str_to_two_byte_iter(data1))
        board.send_sysex(STRING_DATA, util.str_to_two_byte_iter(data2))
        time.sleep(5)
        board.send_sysex(STRING_DATA, util.str_to_two_byte_iter(data3))
        board.send_sysex(STRING_DATA, util.str_to_two_byte_iter(data4))
        # Limpa a janela Pyhton
        time.sleep(5)
        clearConsole()
    chcPin = 0