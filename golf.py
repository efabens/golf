from requests import get
from datetime import datetime

top = get('https://statdata.pgatour.com/r/current/leaderboard-v2.json').json()
leaders = top['leaderboard']
# Potential values we will want to use from leaders
# 'tournament_id', 'tournament_name', 'start_date', 'end_date', 'in_cup', 'is_started', 'is_finished', 'current_round',
# 'round_state', 'in_playoff', 'courses', 'cut_line', 'players'

started = leaders['is_started']
finished = leaders['is_finished']
cur_round = leaders['current_round']
round_state = leaders['round_state']
name = leaders['tournament_name']
start_date = leaders['start_date']
end_date = leaders['end_date']
cut = leaders['cut_line']
course = leaders['courses'][0]
# 'course_name', 'par_in', 'par_out', 'par_total', 'distance_in', 'distance_out', 'distance_total', 'holes'

# this is a list each item being a hole. This is probably a v2 process to figure out what I might want to do
holes = course['holes']

# players is a list, with a but ton of data we probably don't care about and a little we do
players = leaders['players']
# possible fields to hold onto
# 'player_id', 'player_bio', 'current_position', 'start_position', 'status', 'thru', 'back9', 'start_hole',
# 'current_round', 'course_hole', 'today', 'total', 'wildcard', 'total_strokes', 'rounds', 'holes', 'tournament_stats',
# 'rankings', 'par_performance', 'group_id'


print(name)
print(course['course_name'])
print('')
print("{pos:4<} {name:<20} {total:<5} {through:<4} {today}".format(pos='Pos', name='Player Name', total='Total',
                                                                   through='Thru',
                                                                   today='Round'))
has_cut = False
for p in players:
    bio = p['player_bio']
    name = bio['first_name'] + " " + bio['last_name']
    pos = p['current_position']
    today = p['today']
    total = p['total']

    if not has_cut and (cut['show_projected'] or cut['show_cut_line']) and total > cut['cut_line_score']:
        has_cut = True
        cut_line = '-' * 20 + ' Projected Cut ' + str(cut['cut_line_score']) + ' ' + '-' * 20
        print(cut_line)

    # if started on back 9
    start_hole = p['start_hole'] == 10
    through = p['thru']

    if today is None:
        today = ''
        tee_time = [i['tee_time'] for i in p['rounds'] if i['round_number'] == cur_round][0]
        through = datetime.strptime(tee_time, '%Y-%m-%dT%H:%M:%S').strftime('%-I:%M%p')
    if through == 18:
        through = 'F'
    if start_hole:
        through = str(through) + '*'
    if p['status'] == 'wd':
        pos = 'WD'
        total = 'WD'
        through = ''
        today = ''
    printable = "{pos:<4} {name:<20} {total:<5} {through:<3} {today:>3}".format(pos=pos, name=name, total=total,
                                                                                today=today,
                                                                                through=through)
    print(printable)
