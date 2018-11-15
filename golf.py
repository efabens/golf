from requests import get
from datetime import datetime
from argparse import ArgumentParser
from schedule import printTourney, getTourneyIdYear


def getFormatted(p, has_cut, cut, cur_round):
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
    start_hole = p['start_hole'] != 1
    through = p['thru']

    if today is None:
        today = ''
        tee_time = [i['tee_time'] for i in p['rounds'] if i['round_number'] == cur_round][0]
        try:
            through = datetime.strptime(tee_time, '%Y-%m-%dT%H:%M:%S').strftime('%-I:%M%p')
        except TypeError:
            through = None
    if through == 18:
        through = 'F'
    if start_hole:
        through = str(through) + '*'
    if p['status'] == 'wd':
        pos = 'WD'
        total = ''
        through = ''
        today = ''
    elif p['status'] == 'cut':
        pos = 'CUT'
        through = ''
        today = ''
    elif p['status'] == 'dq':
        pos = 'DQ'
        total = ''
        through = ''
        today = ''
    elif total >= 0:
        total = " " + str(total)
    printable = "{pos:<4} {name:<20} {total:<5} {through:<3} {today:>3}".format(pos=pos, name=name, total=total,
                                                                                today=today,
                                                                                through=through)
    return printable, has_cut


def process(args, tournament_id_year):
    try:
        top = get('https://statdata.pgatour.com/r/' + tournament_id_year + '/leaderboard-v2.json').json()
    except ValueError:
        print("Provided tournament ID did not work, defaulting to current")
        top = get('https://statdata.pgatour.com/r/current/leaderboard-v2.json').json()
    leaders = top['leaderboard']
# Potential values we will want to use from leaders
# 'tournament_id', 'tournament_name', 'start_date', 'end_date', 'in_cup', 'is_started', 'is_finished', 'current_round',
# 'round_state', 'in_playoff', 'courses', 'cut_line', 'players'

    # started = leaders['is_started']
    # finished = leaders['is_finished']
    cur_round = leaders['current_round']
    # round_state = leaders['round_state']
    name = leaders['tournament_name']
    # start_date = leaders['start_date']
    # end_date = leaders['end_date']
    cut = leaders['cut_line']
    course = leaders['courses'][0]
    # 'course_name', 'par_in', 'par_out', 'par_total', 'distance_in', 'distance_out', 'distance_total', 'holes'

    # this is a list each item being a hole. This is probably a v2 process to figure out what I might want to do
    # holes = course['holes']

    # players is a list, with a butt ton of data we probably don't care about and a little we do
    players = leaders['players']
    # possible fields to hold onto
    # 'player_id', 'player_bio', 'current_position', 'start_position', 'status', 'thru', 'back9', 'start_hole',
    # 'current_round', 'course_hole', 'today', 'total', 'wildcard', 'total_strokes', 'rounds', 'holes',
    # 'tournament_stats',
    # 'rankings', 'par_performance', 'group_id'

    print(name)
    print(course['course_name'])
    print('')
    print("{pos:4<} {name:<20} {total:<5} {through:<4} {today}".format(pos='Pos', name='Player Name', total='Total',
                                                                       through='Thru',
                                                                       today='Round'))
    has_cut = any([p['status']=='cut' for p in players])
    if args.sortField[0] == 't':
        for i in players:
            if i['thru'] is None:
                i['thru'] = 0
        players = sorted(players, key=lambda p: p['thru'], reverse=True)
        has_cut = True
    elif args.sortField[0] == 'r':
        players = sorted(players, key=lambda p: p['today'] if p['today'] is not None else 900)
        has_cut = True
    for p in players:
        printable, has_cut = getFormatted(p, has_cut, cut, cur_round)

        print(printable)
    return players


if __name__ == '__main__':
    parser = ArgumentParser(description="prints out golf standings. All data sourced from pgatour.com")
    parser.add_argument('-s', '--sort', dest="sortField", default="pos", help="Provides basic sort functionality. "
                        "Choices are 'thru', 'pos', and 'round'. defaults to 'pos'")
    parser.add_argument('-w', '--week', dest="week_t", default=False, action='store_true', help="Lists the tournaments "
                        "and IDs that are occuring this week, when passed in leaderboard is not shown")
    parser.add_argument('-t', '--tournament', dest="t_index", default=0, help="Allows override of tournament "
                        "value. Defaults to index 0 from --week, but it can be overridden with different indexes")
    parser.add_argument('-c', '--current', dest="current", default=False, action='store_true', help="Sets the "
                        "tournament value to 'curent' this. This is usually the most high profile tournament of the "
                        "week. This is also the fallback state of the program if the spcified tournament id doesn't "
                        "work, which sometimes occurs early in the week.")

    args = parser.parse_args()
    if args.week_t:
        printTourney()
    elif not args.current:
        tournament = getTourneyIdYear(args.t_index)
        players = process(args, tournament)
    else:
        players = process(args, 'current')
