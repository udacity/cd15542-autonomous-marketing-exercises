# Calibration Set — Candidate Human Scores

Scored 1-5 on campaign fit — local relevance, content niche, and audience overlap with Bellwood's buyers — by a person, before `brg-campaign-fit-judge` is run on the same set. Used to check whether the judge's scores land within one point of these.

| Candidate | Human score | Judge fit (original rubric) | Judge fit (updated rubric) | Difference (updated) | Flag | Note |
|---|---|---|---|---|---|---|
| A | 5 | 5 | 5 | 0 | | Small but entirely local, directly relevant niche. |
| B | 5 | 5 | 5 | 0 | | Local, on-niche, clean disclosure history. |
| C | 2 | 1 | 1 | 1 | | Large following, but national luxury audience with no local tie — wrong niche for this campaign. |
| D | 1 | 1 | 1 | 0 | | Large following, but travel content with no relevance to local home buyers at all. |
| E | 3 | 3 | 4 | 1 | | Strong local ties, but the niche (food) only loosely connects to home buying. |
| F | 1 | 1 | 1 | 0 | | No local tie and no niche relevance despite a sizable following. |
| G | 5 | 5 | 5 | 0 | | Small following, but exactly the niche and audience this campaign needs. |
| H | 3 | 2 | 2 | 1 | | Real-estate niche fits, but national and impersonal — reads as industry news, not a local recommendation. |
| I | 5 | 5 | 5 | 0 | | Local, on-niche: moving into and setting up a home in the Bellwood metro. |
| J | 3 | 2 | 2 | 1 | | Some relevant local content, but mostly national luxury staging work that dilutes the fit. |

**Flags (differ by more than one point):** none under either rubric. Original rubric: largest gap 1 point (C, H, J, judge lower). Updated rubric: largest gap 1 point (C judge lower, E judge higher, H and J judge lower).

**Run notes:** each creator was scored by its own judge instance, seeing only that creator's profile. Judges for C and E initially returned an error because no `research/<handle>.json` existed; both were rerun with a note that the profile stands in for the research file in calibration, and then scored. Personalization was not scored (no emails in the calibration set).

**Updated-rubric run:** after adding "score local relevance and niche above reach" to the judge's rubric, all ten were rerun, one judge per creator in parallel, each seeing only its own profile. E moved from 3 to 4 (now one above the human score); no other score changed.
