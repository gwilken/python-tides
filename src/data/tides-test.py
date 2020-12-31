from collections import defaultdict
from pprint import pp
import matplotlib.pyplot as plt
import numpy as np
from time import process_time, process_time_ns

# A sine wave reminder: y(t) = amplitude * sin (2 * pi * freq * t + phase)

# Tidal data
tide_categories = 'c_num name amp phase speed desc'.split()

tide_data = '''\
1	  M2	  1.59	  115.2	  28.9841042	  Principal lunar semidiurnal constituent
2	  S2	  0.881	  149.3	  30.0	        Principal solar semidiurnal constituent
3	  N2	  0.301	  108.3	  28.4397295	  Larger lunar elliptic semidiurnal constituent
4	  K1	  0.341	  246.4	  15.0410686	  Lunar diurnal constituent
5	  M4	  0.0	    0.0	    57.9682084	  Shallow water overtides of principal lunar constituent
6	  O1	  0.212	  206.0	  13.9430356	  Lunar diurnal constituent
7	  M6	  0.0	    0.0	    86.9523127	  Shallow water overtides of principal lunar constituent
8	  MK3	  0.0	    0.0	    44.0251729	  Shallow water terdiurnal
9	  S4	  0.0	    0.0	    60.0	        Shallow water overtides of principal solar constituent
10	MN4	  0.0	    0.0	    57.4238337	  Shallow water quarter diurnal constituent
11	NU2	  0.056	  107.2	  28.5125831	  Larger lunar evectional constituent
12	S6	  0.0	    0.0	    90.0	        Shallow water overtides of principal solar constituent
13	MU2	  0.054	  103.5	  27.9682084	  Variational constituent
14	2N2	  0.044	  97.6	  27.8953548	  Lunar elliptical semidiurnal second-order constituent
15	OO1	  0.014	  318.8	  16.1391017	  Lunar diurnal
16	LAM2	0.014	  117.0	  29.4556253	  Smaller lunar evectional constituent
17	S1	  0.011	  95.0	  15.0	        Solar diurnal constituent
18	M1	  0.014	  246.3	  14.4966939	  Smaller lunar elliptic diurnal constituent
19	J1	  0.02	  277.8	  15.5854433	  Smaller lunar elliptic diurnal constituent
20	MM	  0.023	  19.4	  0.5443747	    Lunar monthly constituent
21	SSA	  0.0	    0.0	    0.0821373	    Solar semiannual constituent
22	SA	  0.0	    0.0	    0.0410686	    Solar annual constituent
23	MSF	  0.0	    0.0	    1.0158958	    Lunisolar synodic fortnightly constituent
24	MF	  0.037	  33.0	  1.0980331	    Lunisolar fortnightly constituent
25	RHO	  0.008	  188.6	  13.4715145	  Larger lunar evectional diurnal constituent
26	Q1	  0.043	  183.3	  13.3986609	  Larger lunar elliptic diurnal constituent
27	T2	  0.06	  149.2	  29.9589333	  Larger solar elliptic constituent
28	R2	  0.007	  150.6	  30.0410667	  Smaller solar elliptic constituent
29	2Q1	  0.005	  165.9	  12.8542862	  Larger elliptic diurnal
30	P1	  0.104	  244.9	  14.9589314	  Solar diurnal constituent
31	2SM2	0.0	    0.0	    31.0158958	  Shallow water semidiurnal constituent
32	M3	  0.0	    0.0	    43.4761563	  Lunar terdiurnal constituent
33	L2	  0.048	  120.9	  29.5284789	  Smaller lunar elliptic semidiurnal constituent
34	2MK3	0.0	    0.0	    42.9271398	  Shallow water terdiurnal constituent
35	K2	  0.241	  146.8	  30.0821373	  Lunisolar semidiurnal constituent
36	M8	  0.0	    0.0	    115.9364166	  Shallow water eighth diurnal constituent
37	MS4	  0.0	    0.0	    58.9841042	  Shallow water quarter diurnal constituent'''.splitlines()


def parse(data, categories):
  ''' Parse tidal constituent data into a list of
      dictionaries.
  '''
  tides_list = []
  for line in data:
    num, name, amp, phase, speed, *text = line.split()
    desc = ' '.join(text)
    f_data = map(float, [amp, phase, speed])
    tide_dict = {}

    for key, value in zip(categories, [num, name, *f_data, desc]):
      tide_dict[key] = value

    tides_list.append(tide_dict)
  return tides_list


def sine(wave, x):
  return wave['amp'] * np.sin(2 * np.pi * wave['speed'] * x + wave['phase'])


def sort_category(data, category):
  return [x for x in sorted(data, key=lambda y: y[category], reverse=True) if x[category] > 0.0]


def normalize(data):
  return [float(i) / max(data) for i in data]



def graph_sines(data):
  # fig = plt.figure(figsize=(20, 16))
  # fig = plt.figure(figsize=(20, 2))
  # ax = plt.gca()
  # ax.spines['bottom'].set_position('center')
  # ax.spines['left'].set_position('center')
  # plt.ylim([-2.75, 2.75])
  # plt.xlim([0, 1.5])
  # plt.axis('off')

  x = np.arange(0, 1.5, 0.001)

  waves = []
  left = 0
  bottom = 0
  width = 1
  # height = 1 / ( len(data) + 1)
  height = 1

  for index, c in enumerate(data):
    fig = plt.figure(figsize=(20, 2))
    ax = plt.gca()
    ax.spines['bottom'].set_position('center')
    ax.spines['left'].set_position('center')
    plt.ylim([-2.75, 2.75])
    plt.xlim([0, 1.5])
    plt.axis('off')
    y = sine(c, x)
    waves.append(y)
    ax.plot(x, y, color='white', lw=1)
    fig.savefig(f"wave-{index}.svg", transparent=True, bbox_inches='tight')

  plt.autoscale(False)
  # ax.plot(x, sum(waves), lw=2, color='#0e85ea')
  # fig.savefig('sum.svg', transparent=True, bbox_inches='tight')



def scatter(values):
  # plt.ylim([0, 2])
  # plt.xlim([0, 2])

  for x, y, z in values:
    # n_z = normalize(z)
    plt.scatter(x, 0, s=z * 50000, alpha=0.25, clip_on=False)
  
  plt.hlines(0, 0, 360, color='black',  lw=.5)
  plt.axis('off')
  plt.subplots_adjust(left=0, right=1, top=1, bottom=0)
  plt.show()
  #   print(value)
  #   ax.set_xlim((0, 5))
  #   ax.set_ylim((0, 5))
  #   circle = plt.Circle((2.5, 2.5), value, color='b', fill=False)
  #   ax.add_artist(circle)
  # plt.show()


def bar(data):
  ''' Create bar chart showing where each value lands
    on 360 degree spread '''
  positions = [x[0] for x in data]
  # values = [x[1] for x in data]
  # values = [x[1] for x in data]
  values = [1 for x in data]
  # pp(positions)
  # x_pos = [index for index, _ in enumerate(values)]
  # plt.set(yticklabels=[])
  # plt.tick_params(left=False)
  frame = plt.gca()
  frame.axes.get_yaxis().set_visible(False)
  plt.bar(positions, values, width=1)
  plt.show()



def dots(data):
  positions = [x[0] for x in data]
  # values = [x[1] for x in data]
  values = [x[1] for x in data]
  # values = [1 for x in data]
  plt.plot(positions, normalize(values), 'bo')
  plt.show()



all_harmonics = parse(tide_data, tide_categories)

phase_amp = [[x['phase'], x['amp']] for x in all_harmonics]

phase_speed_amp = [[x['phase'], x['speed'], x['amp']] for x in all_harmonics if x['amp'] > 0.0]

phase_amp_speed = [[x['phase'], x['amp'], x['speed']] for x in all_harmonics if x['amp'] > 0.0]

# pp(phase_speed_amp)

# scatter(phase_speed_amp)


# pp(phases)



amp_harmonics = sort_category(all_harmonics, 'amp')

amps = [ x['amp'] for x in sort_category(amp_harmonics, 'amp') ]
# amps_n = normalize(amps)

# speeds = [ x['speed'] for x in sort_category(all_harmonics, 'speed') ]
# speeds_n = normalize(speeds)

phases = [ x['phase'] for x in sort_category(all_harmonics, 'phase') ]
# phases_n = normalize(phases)

# s_data = [[x['phase'], x['speed'], x['amp']] for x in all_harmonics ]

# s_data = list( [x ,y, z] for x, y, z in zip(phases, speeds_n, amps_n) )

# pp(s_data)



# scatter(s_data)

# dots(phase_amp)


graph_sines(amp_harmonics[:8])

