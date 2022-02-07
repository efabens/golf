from requests import get
from datetime import datetime
from argparse import ArgumentParser
from schedule import printTourney, getTourneyIdYear
from utility import custom_background, ENDC, custom_text_color, all_keys, show_and_pop_all
from os import path

script_location = path.dirname(path.abspath(__file__))

with open(f"{script_location}/token.txt", 'r') as f:
    token = f.readline().strip()


def getFormatted(p, has_cut, cut, cur_round):
    # print(p)
    bio = p['playerNames']
    name = f"{bio['firstName']} {bio['lastName']}{bio['playerNameAddOns']}"

    pos = p['positionCurrent']
    today = p['round']
    total = p['total']

    # cut_line_score is potentially a string now and therefore this could have some problems
    if cut['cut_line_score'] == 'E':
        cut['cut_line_score'] = '0'
    if not has_cut and (cut['show_projected'] or cut['show_cut_line']) and int(total) > int(cut['cut_line_score']):
        has_cut = True
        cut_line = '-' * 20 + ' Projected Cut ' + \
            str(cut['cut_line_score']) + ' ' + '-' * 20
        print(cut_line)

    # if started on back 9
    start_hole = p['startingHoleId'] != '1'
    through = p['thru']
    if today == "--":
        today = ''
        if p['showTeeTime']:
            through = p['teeTime']
    if today == 'E':
        today = " 0"
    if through == 18:
        through = 'F'
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
    elif total == '0':
        total = " " + str(total)
    printable = "{pos:<4} {name:<23} {total:<5} {through:<4} {today}".format(pos=pos, name=name, total=total,
                                                                             today=today,
                                                                             through=through)
    return printable, has_cut


def get_leader_json(tournament_id_year):
    url = 'https://lbdata.pgatour.com/' + tournament_id_year + \
        '/leaderboard.json?userTrackingId=' + token
    print(url)
    something = get(url)
    # print(something.status_code)
    print(something)
    top = something.json()
    # except ValueError:
    #     print(ValueError)
    #     print("Provided tournament ID did not work, defaulting to current")
    #     top = get(
    #         f'https://statdata.pgatour.com/r/current/leaderboard-v2.json?userTrackingId={token}').json()
    # return top['leaderboard']
    return top


def process(args, leaders, tournament):

    # Potential values we will want to use from leaders
    # 'tournament_id', 'tournament_name', 'start_date', 'end_date', 'in_cup', 'is_started', 'is_finished', 'current_round',
    # 'round_state', 'in_playoff', 'courses', 'cut_line', 'players'
    # started = leaders['is_started']
    # finished = leaders['is_finished']
    cur_round = leaders['tournamentRoundId']
    # round_state = leaders['round_state']
    name = tournament['trnName']['medium']
    # start_date = leaders['start_date']
    # end_date = leaders['end_date']
    cut = leaders['cutLines'][0]
    course = tournament['courses'][0]['courseName']

    # 'course_name', 'par_in', 'par_out', 'par_total', 'distance_in', 'distance_out', 'distance_total', 'holes'

    # this is a list each item being a hole. This is probably a v2 process to figure out what I might want to do
    # holes = course['holes']

    # players is a list, with a butt ton of data we probably don't care about and a little we do
    players = leaders['rows']
    # possible fields to hold onto
    # 'player_id', 'player_bio', 'current_position', 'start_position', 'status', 'thru', 'back9', 'start_hole',
    # 'current_round', 'course_hole', 'today', 'total', 'wildcard', 'total_strokes', 'rounds', 'holes',
    # 'tournament_stats',
    # 'rankings', 'par_performance', 'group_id'

    print(name)
    print(course)
    print('')
    print("{pos:<4} {name:<23} {total:<5} {through:<4} {today}".format(pos='Pos', name='Player Name', total='Total',
                                                                       through='Thru',
                                                                       today='Round'))
    has_cut = any([p['status'] == 'cut' for p in players])
    if args.sortField[0] == 't':
        for i in players:
            if i['thru'] is None:
                i['thru'] = 0
        players = sorted(players, key=lambda p: p['thru'], reverse=True)
        has_cut = True
    elif args.sortField[0] == 'r':
        players = sorted(
            players, key=lambda p: p['today'] if p['today'] is not None else 900)
        has_cut = True
    elif args.sortField[0] == 'p':
        players = sorted(
            players, key=score_ratio)

    for p in players:
        printable, has_cut = getFormatted(p, has_cut, cut, cur_round)

        print(printable)
    return players


def score_ratio(player):
    holes = (player['current_round']-1)*18
    if player['thru']:
        holes += int(player['thru'])
    if not holes:
        return 900
    return player['total']/holes


def score_card(player, top, tournament_id):
    # for i in top['players']
    tid = tournament_id['permNum']
    ty = "2020"
    p = top['players'][0]
    pid = p['player_id']
    round_id = p['current_round']
    rounds = []
    for i in range(round_id):
        rounds.append(get(
            f"https://lbdata.pgatour.com/{ty}/r/{tid}/drawer/r{i+1}-m{pid}.json").json())

    # 'player_id' this is probably static and unique so is worth making a lookup option
    #  'player_bio' this has name and such
    # 'current_position` will want to display this
    # 'player_id', 'player_bio', 'current_position', 'status', 'thru', 'back9', 'start_hole', 'course_id', 'current_round', 'course_hole', 'today', 'total', 'total_strokes', 'rounds', 'holes', 'par_performance', 'group_id'
    card = rounds[0]["scoreCards"]
    print(card)

    l = print_front9(card['pages'][0], 1)
    print(l)
    l = print_back9(card['pages'][1], l)
    print(l)
    for i in l:
        print("|".join(i))

    return card


def print_front9(card, round_number, lines=None):
    if not lines:
        lines = []
    lines1 = card['lines']

    h = lines1[0]
    holes_to_print = make_line(h, lambda x: f" {x['holeNumber']:>2} ", "Hole")

    lines.append(holes_to_print)
    top = ['‾' * len(i) for i in holes_to_print]
    lines.append(top)
    h = lines1[1]
    par_to_print = make_line(h, lambda x: f" {x:>2} ", "Par")
    lines.append(par_to_print)
    bottom = ['_' * len(i) for i in holes_to_print]
    lines.append(bottom)
    lines.append(top)
    h = lines1[2]
    status_to_print = make_line(
        h, lambda x: color_strokes(x), f"Round {round_number}")
    lines.append(status_to_print)
    lines.append(bottom)
    lines.append(top)
    h = lines1[3]
    status_to_print = make_line(h, lambda x: f" {x:>2} ", "Status")
    lines.append(status_to_print)
    very_bottom = ['_' * len(i) for i in holes_to_print]
    lines.append(very_bottom)

    return lines


def print_back9(card, lines):
    lines1 = card['lines']

    h = lines1[0]
    holes_to_print = make_line(h, lambda x: f" {x['holeNumber']:>2} ")

    lines[0] += holes_to_print
    top = ['‾' * len(i) for i in holes_to_print]
    lines[1] += top
    h = lines1[1]
    par_to_print = make_line(h, lambda x: f" {x:>2} ")
    lines[2] += par_to_print
    bottom = ['_' * len(i) for i in holes_to_print]
    lines[3] += bottom
    lines[4] += top
    h = lines1[2]
    status_to_print = make_line(h, lambda x: color_strokes(x))
    lines[5] += status_to_print
    lines[6] += bottom
    lines[7] += top
    h = lines1[3]
    status_to_print = make_line(h, lambda x: f" {x:>2} ")
    lines[8] += status_to_print
    very_bottom = ['_' * len(i) for i in holes_to_print]
    lines[9] += very_bottom

    return lines1


def make_line(h, function, name=None, extra=True):
    dynamic = [function(i) for i in h['holes']]
    if name:
        name_block = [f'{name:<7}']
    else:
        name_block = []
    to_print = name_block + dynamic + \
        [f" {str(h['inOut']).upper():^5} ", f" {str(h['total']).upper():^5} "]
    if extra:
        return to_print + [""]
    return to_print


def color_strokes(aMap):
    d = int(aMap['difference'])
    s = str(aMap['score'])
    colored = ""
    if d == -1:
        colored = custom_background(
            (174, 212, 246)) + custom_text_color((0, 0, 0))
    elif d == -2:
        colored = custom_background(
            (50, 177, 228)) + custom_text_color((0, 0, 0))
    elif d == -3:
        colored = custom_background(
            (109, 152, 187)) + custom_text_color((0, 0, 0))
    elif d == 1:
        colored = custom_background(
            (247, 185, 66)) + custom_text_color((0, 0, 0))
    elif d == 2:
        colored = custom_background(
            (238, 90, 0)) + custom_text_color((0, 0, 0))
    elif d >= 3:
        colored = custom_background(
            (159, 89, 36)) + custom_text_color((0, 0, 0))

    # print("c", len(colored), colored)
    # print("s", len(s))

    # n = len(colored) +1
    return f"{colored} {s:>2} {ENDC}"


if __name__ == '__main__':
    parser = ArgumentParser(
        description="prints out golf standings. All data sourced from pgatour.com")
    parser.add_argument('-s', '--sort', dest="sortField", default="leader", help="Provides basic sort functionality. "
                        "Choices are 'thru', 'perhole', and 'round'. when not provided sorts by overall leader")
    parser.add_argument('-w', '--week', dest="week_t", default=False, action='store_true', help="Lists the tournaments "
                        "and IDs that are occuring this week, when passed in leaderboard is not shown")
    parser.add_argument('-t', '--tournament', dest="t_index", default=0, help="Allows override of tournament "
                        "value. Defaults to index 0 from --week, but it can be overridden with different indexes")
    parser.add_argument('-p', '--player', dest="p_score",
                        default=None, help="If given a named player ")

    args = parser.parse_args()
    if args.week_t:
        printTourney()
    else:
        tournamentCode, tournament = getTourneyIdYear(args.t_index)
        top = get_leader_json(tournamentCode)
        if not args.p_score:
            process(args, top, tournament)
        else:
            card = score_card(args.p_score, top, tournament)


# player `tournament_stats` may be interesting at some point
