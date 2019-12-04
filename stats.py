from json import load

with open('result.json', 'r') as f:
    l = load(f)['leaderboard']

c = l['courses'][0] # This is a list for some reasons
p = l['players']
t = l['tournament_id']
h = c['holes']
o = h[0]