import json

notes = '''108	 	88	C8	c’’’’’	4186.01
107	 	87	B7	h’’’’	3951.07
106	 	86	A#7/Bb7	ais’’’’/b’’’’	3729.31
105	 	85	A7	a’’’’	3520.00
104	 	84	G#7/Ab7	gis’’’’/ges’’’’	3322.44
103	 	83	G7	g’’’’	3135.96
102	 	82	F#7/Gb7	fis’’’’/ges’’’’	2959.96
101	 	81	F7	f’’’’	2793.83
100	 	80	E7	e’’’’	2637.02
99	 	79	D#7/Eb7	dis’’’’/es’’’’	2489.02
98	 	78	D7	d’’’’	2349.32
97	 	77	C#7/Db7	cis’’’’/des’’’’	2217.46
96		76	C7	c’’’’	2093.00
95		75	B6	h’’’	1975.53
94		74	A#6/Bb6	ais’’’/b’’’	1864.66
93		73	A6	a’’’	1760.00
92		72	G#6/Ab6	gis’’’/as’’’	1661.22
91		71	G6	g’’’	1567.98
90		70	F#6/Gb6	fis’’’/ges’’’	1479.98
89		69	F6	f’’’	1396.91
88		68	E6	e’’’	1318.51
87		67	D#6/Eb6	dis’’’/es’’’	1244.51
86		66	D6	d’’’	1174.66
85		65	C#6/Db6	cis’’’/des’’’	1108.73
84		64	C6	c’’’	1046.50
83		63	B5	h’’	987.77
82		62	A#5/Bb5	ais’’/b’’	932.33
81		61	A5	a’’	880.00
80		60	G#5/Ab5	gis’’/as’’	830.61
79		59	G5	g’’	783.99
78		58	F#5/Gb5	fis’’/ges’’	739.99
77		57	F5	f’’	698.46
76		56	E5	e’’	659.26
75		55	D#5/Eb5	dis’’/es’’	622.25
74		54	D5	d’’	587.33
73		53	C#5/Db5	cis’’/des’’	554.37
72		52	C5	c’’	523.25
71		51	B4	h’	493.88
70		50	A#4/Bb4	ais’/b’	466.16
69		49	A4 concert pitch	a’ Kammerton	440.00
68		48	G#4/Ab4	gis’/as’	415.30
67		47	G4	g’	392.00
66		46	F#4/Gb4	fis’/ges’	369.99
65		45	F4	f’	349.23
64		44	E4	e’	329.63
63		43	D#4/Eb4	dis’/es’	311.13
62		42	D4	d’	293.66
61		41	C#4/Db4	cis’/des’	277.18
60		40	C4 (middle C)	c’ (Schloss-C)	261.63
59		39	B3	h	246.94
58		38	A#3/Bb3	ais/b	233.08
57		37	A3	a	220.00
56		36	G#3/Ab3	gis/as	207.65
55	  35	G3	g	196.00
54		34	F#3/Gb3	fis/ges	185.00
53		33	F3	f	174.61
52		32	E3	e	164.81
51		31	D#3/Eb3	dis/es	155.56
50		30	D3	d	146.83
49		29	C#3/Db3	cis/des	138.59
48		28	C3	c	130.81
47		27	B2	H	123.47
46		26	A#2/Bb2	Ais/B	116.54
45		25	A2	A	110.00
44		24	G#2/Ab2	Gis/As	103.83
43		23	G2	G	98.00
42		22	F#2/Gb2	Fis/Ges	92.50
41		21	F2	F	87.31
40		20	E2	E	82.41
39		19	D#2/Eb2	Dis/Es	77.78
38		18	D2	D	73.42
37		17	C#2/Db2	Cis/Des	69.30
36		16	C2	C	65.41
35	 	15	B1	H1	61.74
34	 	14	A#1/Bb1	Ais1/b1	58.27
33	 	13	A1	A1	55.00
32	 	12	G#1/Ab1	Gis1/As1	51.91
31	 	11	G1	G1	49.00
30	 	10	F#1/Gb1	Fis1/Ges1	46.25
29	 	9	F1	F1	43.65
28	 	8	E1	E1	41.20
27	 	7	D#1/Eb1	Dis1/Es1	38.89
26	 	6	D1	D1	36.71
25	 	5	C#1/Db1	Cis1/Des1	34.65
24	 	4	C1	C1	32.70
23	 	3	B0	H2	30.87
22	 	2	A#0/Bb0	Ais2/B2	29.14
21	 	1	A0	A2	27.50'''.splitlines()

data = [x.split() for x in notes]

data_dict = []

for item in data:
  data_dict.append({
    'midi note': item[0],
    'piano key': item[1],
    'note name': item[2]
  })


with open("midi-notes.js", 'w') as w:
  w.write(json.dumps(data_dict))

