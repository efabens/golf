from requests import get


def thisWeek():
    schedule = get('https://statdata.pgatour.com/r/current/schedule-v2.json').json()
    weekNum = schedule['thisWeek']['weekNumber']
    # This grabs the first one because I believe that is always the current year. There could be problems with year end
    # tournaments but as this is a project that I iterate on as I remember, I am not too concerned, no one cares about
    # new years tournaments.
    years = schedule['years'][0]
    tourns = years['tours'][0]['trns']

    return [i for i in tourns if i['date']['weekNumber'] == weekNum]


def printTourney():
    curWeek = thisWeek()
    for count, tournament in enumerate(curWeek):
        name = tournament['trnName']['short']
        number = tournament['permNum']
        year = tournament['year']
        index = str(count)

        print(index + ": " + name + ", " + number + "/" + year)


def getTourneyIdYear(index):
    curWeek = thisWeek()
    try:
        tournament = curWeek[int(index)]
    except (IndexError, TypeError):
        tournament = curWeek[0]
    number = tournament['permNum']
    year = tournament['year']
    return number + '/' + year
