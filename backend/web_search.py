import bs4
import requests
import re
import json
import PyPDF2

# The file that link queues are saved to
QUEUE_FILE = "queue.csv"
# USC starting point 
URL = "https://sc.edu/"

# The https prefix to only include website links
PREFIX ="https"

# The template that we will be using for usc related websites search
TEMP = "sc.edu"

# The list of the texts
text_list = []
# Links we've been to
checked_links = set()
added_text = set()


num_to_run = int(input("Give the number of links you want to complete(int)"))

# Finds the text inside of pdf 
def find_pdf_text(url):
  resp = requests.get(url)
  temp_file = "temp_pdf.pdf"
  with open(temp_file, "wb") as f:
    f.write(resp.content)

  pdf_reader = PyPDF2.PdfReader(temp_file)
  all_txt = ""
  for page in pdf_reader.pages:
    all_txt+= page.extract_text()
  return all_txt

# Saving the queue of links that haven't been searched
def save_queue(q_links):
  with open("queue.csv", "w") as f:
    f.write(", ".join(q_links))
    print("Queue file is written!")

def save_text(text_arr):
  clean_txt = []
  for item in text_arr:
    clean_txt.append(item)
  print(len(clean_txt))
  for i in range(len(clean_txt)):
    # clean_text = re.sub(r'[^a-zA-Z ]', '', text)
    clean_txt[i] = re.sub(r'[^a-zA-Z@0-9?!_\-.,;:\' ]', '', clean_txt[i])
    clean_txt[i]= re.sub(r'\s+', ' ', clean_txt[i])
  with open("search_output.json", "a") as f:

    json.dump(clean_txt, f)
    # f.write(", ".join(text_arr))

# Returns page_txt, page_links
def find_page_info(pag_url):
  if (pag_url.endswith(".pdf")):
      try:
        return [], find_pdf_text(pag_url)
      except:
        return [], []

  try:
    resp = requests.get(pag_url)
    # print("HERE", resp.text)
  except:
    return [], []
  try:
    txt = resp.text
    soup = bs4.BeautifulSoup(txt,  "html.parser")
    links = soup.find_all('a')
    clean_links = []
  except:
    return [], []
  # Finding all the links in the page
  for link in links:
    clean_links.append(link.get('href'))
  page_txt = []
  ps = soup.find_all('p')
  for p in ps:
    page_txt.append(p.get_text())
  return clean_links, page_txt

def get_queue():
  with open("queue.csv", "r") as file:
    content = file.read()
    splited = content.split(", ")
  return splited


queue_links = get_queue()
if (not queue_links):
  queue_links = [URL]



counter = 1
while(queue_links):
  # getting the link in front of the queue 
  link_to_check = queue_links.pop(0)
  checked_links.add(link_to_check)
  links, page_txt = find_page_info(link_to_check)
  for item in page_txt:
    text_list.append(item)
  for link in links:
    if (link != None and (not link in checked_links) and (not link in queue_links) and (TEMP in link) and link.startswith(PREFIX)):
      queue_links.append(link)
  
  for item in page_txt:
    if (not item in added_text):
      added_text.add(item)
      text_list.append(item)
  counter += 1

  if (counter % 100 ==0):
    save_text(text_list)
    save_queue(queue_links)
    queue_links = get_queue()
    text_list = []
    print(f"Saved up to {counter}th iteration!")

  if (counter == num_to_run):
    save_text(text_list)
    save_queue(queue_links)
    break
  print(counter, len(queue_links), link_to_check)