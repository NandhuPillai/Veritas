from selenium.webdriver.common.by import By
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from AIAnalyzer.LoadData import *
import re

def getText(URL):
    rootName: re.Match = re.match("(.+)\.(.*)\.(.*)", URL, re.IGNORECASE)
    with webdriver.Chrome(options=getOptions()) as driver:
        try:
            driver.get(URL)
        except:
            pass
        elems = driver.find_elements(By.TAG_NAME, "p")
        body = "\n".join([i.text for i in elems])
        try:
            body = re.sub(f"{rootName.group(2)}", "", body, flags=re.IGNORECASE)
            title = re.sub(f"{rootName.group(2)}", "", driver.title, flags=re.IGNORECASE)
        except:
            title = driver.title


    # return title, body[:min(len(body), 2000)]
    return title, body

def getDatasetFromURL(URL):
    title, text = getText(URL)
    return processWebData([title], [text]), title, text



def getOptions():
    extensions = [
        "cjpalhdlnbpafiamejdnhcphjbkeiagm/1.50.0_4.crx",
        "ecabifbgmdmgdllomnfinbmaellmclnh/0.7.1_0.crx"
    ]
    options = Options()
    # options.add_argument(f"load-extension={extensionPath}")
    [
        options.add_extension(f"{__file__}/../seleniumExtensions/{i}") for i in extensions
    ]
    options.add_experimental_option("excludeSwitches", ["disable-popup-blocking"])

    return options
