from json import load

with open("schedule.json", 'r') as f:
    loaded = load(f)

years = loaded['years'][0]
tourns = years['tours'][0]['trns']
