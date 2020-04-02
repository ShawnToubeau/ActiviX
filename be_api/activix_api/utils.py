# utils.py
# contains functions to make calculations and assessments


def calc_score(val, score, expected):
    multiplier = score
    deviation = (val - expected) / expected
    score = multiplier + (multiplier * deviation)
    return score
