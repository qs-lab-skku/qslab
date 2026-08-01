/* QS Lab research landscape - data file.
   To add or edit entries, see LANDSCAPE-README.md.
   No coordinates needed: placement is computed automatically by research-landscape.html. */

const UPDATED='Updated Aug 2026';

/* Material columns, ordered from metallic to insulating.
   'key' is the value used in each entry's material / materialTo field. */
const COLS=[
 {key:'SC',   n:'Superconducting & topological',m:'FeSe · MnBi₂Te₄ · Te',k:'SC · Topological',tag:'SC · Topo'},
 {key:'TE',   n:'Telluride semimetals',m:'MoTe₂ · WTe₂ · PtTe₂',k:'Semimetal',tag:'Tellurides'},
 {key:'TMD',  n:'TMD semiconductors',m:'MoS₂ · WS₂ · WSe₂ · ReS₂',k:'Semiconductor',tag:'TMD'},
 {key:'IIIVI',n:'III–VI compounds',m:'InSe · In₂Se₃ · GaSe',k:'Semi + Ferro',tag:'III–VI'},
 {key:'FE',   n:'Ferroelectrics',m:'AlScN · HZO · CIPS',k:'Ferroelectric',tag:'FE'},
 {key:'HBN',  n:'Dielectrics',m:'hBN',k:'Dielectric',tag:'hBN'},
];

/* Bands (horizontal rows of the map), top to bottom.
   Entries with 'strip' cover the overlap of two neighbouring themes.
   Row counts and heights are computed from the entries, not declared here. */
const ORDER=[
 {k:'E', c:'E', name:'Outlooks and roadmaps',                sub:'review and roadmap articles', phys:''},
 {k:'Q', c:'Q', name:'Cryogenic and quantum electronics',    sub:'superconducting devices, qubits and low-temperature memory', phys:'Mission 03'},
 {k:'D', c:'D', name:'Quantum light and excitons',           sub:'', phys:'Mission 01'},
 {k:'CD',strip:['D','C'], name:'Ferroelectric control of optical response', phys:''},
 {k:'C', c:'C', name:'Ferroelectric logic and memory',       sub:'gating with AlScN and HZO', phys:'Mission 02'},
 {k:'BC',strip:['C','B'], name:'Contact engineering with ferroelectric gates', phys:''},
 {k:'B', c:'B', name:'Contacts and transistor integration',  sub:'metal–semiconductor junctions and device metrology', phys:''},
 {k:'AB',strip:['B','A'], name:'Growth-defined contacts and interconnects', phys:''},
 {k:'A', c:'A', name:'Synthesis and epitaxy',                sub:'wafer-scale MOCVD and CVD growth', phys:''},
];

/* Entries. Fields:
   id         unique id (used by EDGES)
   kw         short keyword shown in the mobile schematic
   r          band key from ORDER ('A'..'E', 'AB', 'BC', 'CD') or 'F' for the
              energy and functional materials panel
   material   column key from COLS ('SC','TE','TMD','IIIVI','FE','HBN'); omit for r:'F'
   materialTo optional column key; the card spans columns material..materialTo
   j          journal / project label, t: short title, st: 'pub'|'acc'|'rev'|'plan'
   bd         optional 'R'|'P'|'RM' (Review / Perspective / Roadmap)
   pc         optional colour override (band colour is the default), sc: optional second colour
   role, lab, full, cite, url, note as before. */
const P=[
 // Synthesis
 {id:'am18',kw:'Ditelluride nanobelts',r:'A',material:'TE',j:'Adv. Mater. 2018',t:'Single-crystalline TMD ditelluride nanobelts',st:'pub',role:'Coauthor',
  full:'Single-crystalline nanobelts composed of transition metal ditellurides',cite:'Adv. Mater. 30, 1707260 (2018)',url:'https://onlinelibrary.wiley.com/doi/full/10.1002/adma.201707260'},
 {id:'g2',kw:'Confined MoTe₂ growth',r:'A',material:'TE',j:'Active project',t:'Space-confined tellurization growth of MoTe₂',st:'plan',role:'Lab project',lab:1,
  full:'Space-confined tellurization for large-area growth of 2D MoTe₂',cite:'Ongoing work, thermal CVD',note:'Led by Inbae Song'},
 {id:'as20',kw:'Metallic APBs',r:'A',material:'TE',j:'Adv. Sci. 2020',t:'Antiphase boundaries as faceted metallic wires',st:'pub',role:'Coauthor',
  full:'Antiphase Boundaries as Faceted Metallic Wires in 2D Transition Metal Dichalcogenides',cite:'Adv. Sci. 7, 2000788 (2020)',url:'https://doi.org/10.1002/advs.202000788'},
 {id:'afm25',kw:'Degradation control',r:'A',material:'TMD',j:'Adv. Funct. Mater. 2025',t:'Interfacial control of degradation pathways',st:'pub',role:'Coauthor',
  full:'Interfacial Control of Degradation Pathways in 2D Heterostructures',cite:'Adv. Funct. Mater. 2516434 (2025)',url:'https://doi.org/10.1002/adfm.202516434'},
 {id:'nanoscale25',kw:'MOCVD review',r:'A',material:'TMD',materialTo:'IIIVI',j:'Nanoscale 2025',t:'MOCVD of 2D chalcogenides & heterostructures',st:'pub',bd:'R',role:'Corresponding · student first author',lab:1,
  full:'Metal-organic chemical vapour deposition of van der Waals 2D chalcogenides and heterostructures: a review',cite:'Nanoscale 17, 22606–22628 (2025) · Emerging Investigator collection',url:'https://doi.org/10.1039/D5NR02265G',note:'First author Yunjung Cho, written with the first cohort of graduate students'},
 {id:'matter23',kw:'Phase-pure InSe',r:'A',material:'IIIVI',j:'Matter 2023',t:'Wafer-scale growth of phase-pure InSe',st:'pub',role:'First author',
  full:'Wafer-scale growth of two-dimensional, phase-pure InSe',cite:'Matter 6, 3483–3498 (2023) · Featured Article',url:'https://www.cell.com/matter/fulltext/S2590-2385%2823%2900368-5'},
 {id:'g5',kw:'InSe/In₂Se₃ MOCVD',r:'A',material:'IIIVI',j:'Active project',t:'Phase-selective MOCVD of InSe / In₂Se₃',st:'plan',role:'Lab project',lab:1,
  full:'Continuous composition and phase-selective MOCVD across the InSe–In₂Se₃ family',cite:'Ongoing work, cold-wall MOCVD',note:'Led by Jihwan Jeon'},
 {id:'g1',kw:'FeSeTe MOCVD',r:'A',material:'SC',j:'Active project',t:'MOCVD of FeSe₁₋ₓTeₓ superconducting films',st:'plan',role:'Lab project',lab:1,
  full:'MOCVD synthesis platform for FeSe₁₋ₓTeₓ superconducting thin films',cite:'Ongoing work',note:'Led by Yerin So'},
 {id:'small26',kw:'Bernal bBN epitaxy',r:'A',material:'HBN',j:'Small 2026',t:'Self-limiting epitaxy of Bernal-stacked bBN',st:'pub',role:'Coauthor',
  full:'Wafer-Scale Self-Limiting Epitaxy of Bernal-Stacked Single-Crystal Boron Nitride',cite:'Small 22, e13245 (2026)',url:'https://doi.org/10.1002/smll.202513245'},
 // Growth-defined contacts (overlap)
 {id:'as19',kw:'WTe₂ interconnects',r:'AB',material:'TE',pc:'A',j:'Adv. Sci. 2019',t:'Electrically robust WTe₂ nanobelt interconnects',st:'pub',role:'First author',
  full:'Electrically robust single-crystalline WTe₂ nanobelts for nanoscale electrical interconnects',cite:'Adv. Sci. 6, 1801370 (2019) · Frontispiece',url:'https://onlinelibrary.wiley.com/doi/full/10.1002/advs.201801370'},
 {id:'ne20',kw:'Schottky–Mott contacts',r:'AB',material:'TE',j:'Nat. Electron. 2020',t:'Wafer-scale ditelluride contacts at the Schottky–Mott limit',st:'pub',role:'First author',
  full:'Wafer-scale production of patterned transition metal ditelluride layers for 2D metal–semiconductor contacts at the Schottky–Mott limit',cite:'Nat. Electron. 3, 207–215 (2020) · Featured in News & Views',url:'https://www.nature.com/articles/s41928-020-0396-x'},
 {id:'isci22',kw:'PtTe₂ conductors',r:'AB',material:'TE',j:'iScience 2022',t:'Air-stable PtTe₂ vdW conductors',st:'pub',role:'Co-first author',
  full:'Air-stable van der Waals PtTe₂ conductors with high current-carrying capacity and strong spin-orbit interaction',cite:'iScience 25, 105346 (2022)',url:'https://doi.org/10.1016/j.isci.2022.105346'},
 {id:'smallsci25',kw:'Edge contacts',r:'AB',material:'TE',j:'Small Sci. 2025',t:'Edge-contacted FETs via one-pot phase engineering',st:'pub',role:'Corresponding',
  full:'Wafer-Scale Fabrication of Edge-Contacted Nanosheet Transistors via Alloying-Mediated Phase Engineering',cite:'Small Sci. 5, e202500320 (2025)',url:'https://doi.org/10.1002/smsc.202500320'},
 // Contacts & transistors
 {id:'g11',kw:'Te topological FET',r:'B',material:'SC',j:'Emerging direction',t:'Te-channel topological transistors with AlScN gating',st:'plan',role:'Lab project',lab:1,
  full:'Tellurium-channel topological transistors gated by ferroelectric AlScN',cite:'Early-stage direction, ferroelectric gating of a topological channel'},
 {id:'nc22',kw:'Atomic transistors',r:'B',material:'TE',j:'Nat. Commun. 2022',t:'Atomic transistors with sub-1-nm transfer length',st:'pub',role:'First author',
  full:'Atomic transistors based on seamless lateral metal-semiconductor junctions with a sub-1-nm transfer length',cite:'Nat. Commun. 13, 4916 (2022) · Top 25 Physics Articles of 2022',url:'https://www.nature.com/articles/s41467-022-32582-9'},
 {id:'nc23',kw:'p-type arrays',r:'B',material:'TE',j:'Nat. Commun. 2023',t:'p-type arrays with semimetal vdW electrodes',st:'pub',role:'Co-first author',
  full:'Fabrication of p-type 2D single-crystalline transistor arrays with Fermi-level-tuned van der Waals semimetal electrodes',cite:'Nat. Commun. 14, 4747 (2023)',url:'https://www.nature.com/articles/s41467-023-40448-x'},
 {id:'nano23',kw:'vdW/Ga₂O₃ diodes',r:'B',material:'TMD',j:'Nanoscale 2023',t:'Vertical vdW diodes of 2D semiconductors on β-Ga₂O₃',st:'pub',role:'Coauthor',
  full:'Vertical van der Waals Heterojunction Diodes comprising 2D Semiconductors on 3D β-Ga₂O₃',cite:'Nanoscale 15, 9964–9972 (2023)',url:'https://doi.org/10.1039/D3NR01987J'},
 {id:'ncrev',kw:'Optical contact probe',r:'B',material:'TMD',j:'Under review',t:'Ultrafast optical inspection of 2D contacts',st:'rev',role:'Co-corresponding',lab:1,
  full:'Noninvasive optical inspection of 2D contact interfaces using ultrafast transient reflection spectroscopy',cite:'Nat. Commun., in revision (submitted 2025)',note:'With Wonchan Lee and Yunjung Cho'},
 {id:'ceramist25',kw:'2D FET metrology',r:'B',material:'TE',j:'Ceramist 2025',t:'Electrical measurement & parameter analysis of 2D FETs',st:'pub',bd:'R',role:'Corresponding · student first author',lab:1,
  full:'Methodologies for Electrical Measurement and Parameter Analysis of 2D Semiconductor Transistors',cite:'Ceramist 28, 334–355 (2025) · invited review',url:'https://doi.org/10.31613/ceramist.2025.00101',note:'First author Kyungwu Kwon'},
 {id:'nanolett26',kw:'NbSe₂ contacts',r:'B',material:'TMD',j:'Nano Lett. 2026',t:'Near-ideal NbSe₂ contacts for WSe₂ CMOS',st:'pub',role:'Coauthor',
  full:'Near-Ideal van der Waals NbSe₂ Contacts for WSe₂ CMOS Electronics',cite:'Nano Lett. 26, 5307–5313 (2026)',url:'https://doi.org/10.1021/acs.nanolett.6c00871'},
 // Contact engineering × ferroelectrics (overlap)
 {id:'nfl26',kw:'Non-Fermi liquid',r:'BC',material:'TMD',pc:'B',j:'ACS Nano 2026',t:'Non-Fermi liquid & quantum criticality in TMDs',st:'pub',role:'Co-corresponding',lab:1,
  full:'Emergence of non-Fermi-liquid behaviors and quantum criticality in transition metal dichalcogenides',cite:'ACS Nano, ASAP (2026)',url:'https://doi.org/10.1021/acsnano.6c08440',note:'Led by Dr. Nasir Ali (QS Lab), with Wonchan Lee, Yunjung Cho and Kangpyo Cho'},
 {id:'acsn24p',kw:'FeFET polarity',r:'BC',material:'FE',j:'ACS Nano 2024',t:'Polarity tuning in WSe₂/AlScN FeFETs via contacts',st:'pub',role:'Co-first author',
  full:'Tuning Polarity in WSe₂/AlScN FeFETs via Contact Engineering',cite:'ACS Nano 18, 4180–4188 (2024)',url:'https://pubs.acs.org/doi/full/10.1021/acsnano.3c09279'},
 {id:'acsn25',kw:'High-current FeFETs',r:'BC',material:'FE',j:'ACS Nano 2025',t:'High-current MoS₂/AlScN FeFETs with ohmic contacts',st:'pub',role:'Co-first author',
  full:'High Current and Carrier Densities in 2D MoS₂/AlScN Field-Effect Transistors via Ferroelectric Gating and Ohmic Contacts',cite:'ACS Nano 19, 8985–8996 (2025)',url:'https://doi.org/10.1021/acsnano.4c17301'},
 {id:'g7',kw:'Quantum phase control',r:'BC',material:'IIIVI',materialTo:'FE',j:'Funded project',t:'Non-volatile control of quantum phase transitions via large-area vdW ferroelectric transistors',st:'plan',role:'Principal investigator',lab:1,
  full:'Non-Volatile Control of Quantum Phase Transitions via Large-Area van der Waals Ferroelectric Transistors',cite:'Funded project, 2025–2030',note:'Spans the contact, ferroelectric and cryogenic work shown in this map'},
 // Ferroelectric logic & memory
 {id:'afm24',kw:'MoTe₂ memristors',r:'C',material:'TE',j:'Adv. Funct. Mater. 2024',t:'MoTe₂ grain-boundary memristor arrays',st:'pub',role:'Coauthor',
  full:'Wafer-scale memristor array based on aligned grain boundaries of 2D molybdenum ditelluride for artificial synapses',cite:'Adv. Funct. Mater. 34, 2309455 (2024)',url:'https://doi.org/10.1002/adfm.202309455'},
 {id:'nn23',kw:'BEOL AlScN FeFETs',r:'C',material:'FE',j:'Nat. Nanotechnol. 2023',t:'BEOL-compatible AlScN/2D-channel FeFETs',st:'pub',role:'Coauthor',
  full:'Scalable CMOS back-end-of-line-compatible AlScN/two-dimensional channel ferroelectric field-effect transistors',cite:'Nat. Nanotechnol. 18, 1044–1050 (2023)',url:'https://www.nature.com/articles/s41565-023-01399-y'},
 {id:'apl23',kw:'Negative capacitance',r:'C',material:'FE',j:'Appl. Phys. Lett. 2023',t:'Negative-capacitance FETs with AlScN and MoS₂',st:'pub',role:'Co-first author',
  full:'Negative capacitance field-effect transistors based on ferroelectric AlScN and 2D MoS₂',cite:'Appl. Phys. Lett. 123, 183501 (2023)',url:'https://pubs.aip.org/aip/apl/article/123/18/183501/2919098'},
 {id:'nree26',kw:'InSe computing',r:'C',material:'IIIVI',j:'Nat. Rev. Electr. Eng. 2026',t:'Indium selenides for low-power computing',st:'pub',bd:'P',role:'First & corresponding',
  full:'Indium selenides for next-generation low-power computing devices',cite:'Nat. Rev. Electr. Eng. 3, 185–201 (2026)',url:'https://doi.org/10.1038/s44287-025-00251-w'},
 {id:'cossms24',kw:'2D ferroelectrics',r:'C',material:'IIIVI',materialTo:'FE',j:'COSSMS 2024',t:'2D ferroelectrics & ferroelectrics with 2D',st:'pub',bd:'P',role:'Co-first author',
  full:'2D ferroelectrics and ferroelectrics with 2D: materials and device prospects',cite:'Curr. Opin. Solid State Mater. Sci. 32, 101178 (2024)',url:'https://doi.org/10.1016/j.cossms.2024.101178'},
 {id:'necryo',kw:'Cryo AlScN polarization',r:'C',material:'FE',j:'In revision',t:'Giant remnant polarization in cryogenic AlScN',st:'rev',role:'First & co-corresponding',
  full:'Observation of giant remnant polarization in ultrathin AlScN at cryogenic temperatures',cite:'Nat. Electron., in revision · arXiv:2503.19491',url:'https://arxiv.org/abs/2503.19491'},
 {id:'nc25cnt',kw:'SWCNT FeFETs',r:'C',material:'FE',j:'Nat. Commun. 2025',t:'Reconfigurable SWCNT ferroelectric FETs',st:'pub',role:'Coauthor',
  full:'Reconfigurable single-walled carbon nanotube ferroelectric field-effect transistors',cite:'Nat. Commun. 16, 7655 (2025)',url:'https://www.nature.com/articles/s41467-025-62827-2'},
 {id:'device26',kw:'Low-voltage FeFETs',r:'C',material:'FE',j:'Device 2026',t:'Low-voltage FETs with ultrathin AlScN and 2D channels',st:'pub',role:'Coauthor',
  full:'Low-voltage ferroelectric field-effect transistors with ultrathin AlScN and 2D channels',cite:'Device 4, 100989 (2026)',url:'https://doi.org/10.1016/j.device.2025.100989'},
 // Ferroelectric × optics (overlap)
 {id:'resrev',kw:'ReS₂ optical switching',r:'CD',material:'TMD',materialTo:'FE',j:'Under review',t:'Non-volatile optical anisotropy in ReS₂ via ferroelectric gating',st:'rev',role:'Co-first & corresponding',
  full:'Reconfigurable, non-volatile control of optical anisotropy in ReS₂ via ferroelectric gating',cite:'Nat. Photon., under review · arXiv:2509.11897',url:'https://arxiv.org/abs/2509.11897',note:'With Wonchan Lee'},
 // Quantum light & excitons
 {id:'npj23',kw:'Gap-plasmon excitons',r:'D',material:'TMD',j:'npj 2D Mater. 2023',t:'Exciton dynamics in the gap-plasmon regime',st:'pub',role:'Coauthor',
  full:'Tailoring Exciton Dynamics in TMDC Heterobilayers in the Ultranarrow Gap-Plasmon Regime',cite:'npj 2D Mater. Appl. 7, 66 (2023)',url:'https://doi.org/10.1038/s41699-023-00428-7'},
 {id:'nc24',kw:'Confined excitons',r:'D',material:'TMD',sc:'A',j:'Nat. Commun. 2024',t:'Confined excited states in in-plane quantum heterostructures',st:'pub',role:'Coauthor',
  full:'Confinement of excited states in two-dimensional, in-plane, quantum heterostructures',cite:'Nat. Commun. 15, 6361 (2024)',url:'https://www.nature.com/articles/s41467-024-50653-x'},
 {id:'mrl23',kw:'Quantum heterostructures',r:'D',material:'TMD',sc:'A',j:'Mater. Res. Lett. 2023',t:'Spatially controlled 2D quantum heterostructures',st:'pub',bd:'R',role:'Co-first author',
  full:'Spatially controlled two-dimensional quantum heterostructures',cite:'Mater. Res. Lett. 11, 327–346 (2023)',url:'https://doi.org/10.1080/21663831.2022.2151852'},
 {id:'acsn24ct',kw:'Charge-transfer excitons',r:'D',material:'TMD',j:'ACS Nano 2024',t:'Localized charge-transfer excitons in 0D/2D structures',st:'pub',role:'Coauthor',
  full:'Tunable Localized Charge Transfer Excitons in a Mixed-Dimensional van der Waals Heterostructure',cite:'ACS Nano 18, 15185 (2024)',url:'https://doi.org/10.1021/acsnano.4c03260'},
 {id:'g3',kw:'Mn:WS₂ emitters',r:'D',material:'TMD',j:'Active project',t:'Mn-doped WS₂ site-defined quantum emitters',st:'plan',role:'Lab project',lab:1,
  full:'Site-defined single-photon emitters in Mn-doped WS₂ with local magnetic moments',cite:'Ongoing work',note:'Led by Yunjung Cho'},
 {id:'g4',kw:'In–Ga–Se photons',r:'D',material:'IIIVI',j:'International project',t:'In–Ga–Se ferroelectric semiconductors for single-photon emission',st:'plan',role:'Principal investigator',lab:1,
  full:'In–Ga–Se ferroelectric semiconductors with single-photon emission, combining bulk crystal growth by CVT with wafer-scale MOCVD',cite:'International joint research project',note:'Led by Jihwan Jeon'},
 // Cryogenic & quantum electronics
 {id:'g8',kw:'MnBi₂Te₄/FeSe',r:'Q',material:'SC',j:'Funded project',t:'Field-free topological superconductivity in MnBi₂Te₄/FeSe',st:'plan',role:'Lab project',lab:1,
  full:'Field-free topological superconductivity in MnBi₂Te₄/FeSe van der Waals heterostructures',cite:'Funded project, 2026–, using the wafer-scale MOCVD platform'},
 {id:'g9',kw:'vdW transmon',r:'Q',material:'SC',j:'Mission 03 target',t:'van der Waals transmon qubits on FeSe',st:'plan',role:'Lab target',lab:1,
  full:'van der Waals transmon qubits, aimed at the quasiparticle poisoning and two-level systems that limit 3D Josephson junctions',cite:'Mission 03 target'},
 {id:'g12',kw:'PtTe₂ THz',r:'Q',material:'TE',j:'Active project',t:'THz emission & spin–charge conversion in PtTe₂',st:'plan',role:'Lab project',lab:1,
  full:'THz emission and spin–charge conversion in PtTe₂, combined with spin-resolved ARPES',cite:'Ongoing work',note:'Led by Kyungwu Kwon'},
 {id:'g6',kw:'Cryo HZO memory',r:'Q',material:'FE',j:'Active project',t:'Cryogenic non-volatile memory with HZO FeFETs',st:'plan',role:'Lab project',lab:1,
  full:'Cryogenic non-volatile memory based on HZO ferroelectric field-effect transistors',cite:'Ongoing work on cryogenic electronics',note:'Led by Wonchan Lee'},
 {id:'g10',kw:'Josephson FeFET',r:'Q',material:'SC',j:'Mission 03 target',t:'Josephson ferroelectric FETs (FE × SC hybrid)',st:'plan',role:'Lab target',lab:1,
  full:'Josephson ferroelectric FET, in which a ferroelectric gate acts on a superconducting junction',cite:'Mission 03 target'},
 // Outlooks
 {id:'gc24',kw:'2D beyond silicon',r:'E',material:'TE',materialTo:'IIIVI',j:'ACS Nano 2024',t:'Can 2D semiconductors be game-changers?',st:'pub',bd:'R',role:'Co-first author',
  full:'Can 2D Semiconductors Be Game-Changers for Nanoelectronics and Photonics?',cite:'ACS Nano 18, 10955–10978 (2024)',url:'https://pubs.acs.org/doi/10.1021/acsnano.3c12938'},
 {id:'ext26',kw:'Extreme environments',r:'E',material:'FE',materialTo:'HBN',j:'Submitted 2026',t:'Electronics for extreme environments',st:'rev',bd:'R',role:'Co-corresponding',lab:1,
  full:'Electronics for Extreme Environments: Materials, Devices, and System Integration',cite:'Submitted (2026)',note:'Co-first author Kyungwu Kwon, with Yerin So'},
 {id:'roadmap26',kw:'Electronic-grade 2D',r:'E',material:'TMD',materialTo:'FE',j:'2D Mater. 2026',t:'Advancing electronic-grade 2D materials',st:'acc',bd:'RM',role:'Section corresponding',
  full:'Advancing Electronic-Grade 2D Materials: Challenges, Opportunities, and Vision ("Toward Advanced Electronics" section)',cite:'2D Materials, Roadmap · in press (2026)'},
 // Energy and functional materials panel
 {id:'ami19',kw:'Graphene electrodes',r:'F',j:'ACS AMI 2019',t:'Graphene-intercalated transparent electrodes',st:'pub',role:'Coauthor',
  full:'Ultrathin Graphene Intercalation in PEDOT:PSS/Colorless Polyimide-Based Transparent Electrodes',cite:'ACS Appl. Mater. Interfaces 11, 21069 (2019)',url:'https://doi.org/10.1021/acsami.9b04118'},
 {id:'na21',kw:'MXene inks',r:'F',j:'Nanoscale Adv. 2021',t:'High-purity MXene flake inks',st:'pub',role:'Coauthor',
  full:'Synthesis of high-quality 2D carbide MXene flakes using a highly purified MAX precursor for ink applications',cite:'Nanoscale Adv. 3, 517–527 (2021)',url:'https://doi.org/10.1039/d0na00398k'},
 {id:'afm21',kw:'2D catalysts',r:'F',j:'Adv. Funct. Mater. 2021',t:'2D catalysts via heteroepitaxial conversion',st:'pub',role:'Coauthor',
  full:'Design of two-dimensional layered catalyst by coherent heteroepitaxial conversion for robust hydrogen generation',cite:'Adv. Funct. Mater. 31, 2005449 (2021)',url:'https://doi.org/10.1002/adfm.202005449'},
 {id:'kjmr25',kw:'Slag glass',r:'F',j:'KJMR 2025',t:'Slag-based glass marbles with E-glass powder',st:'pub',role:'Coauthor',
  full:'Effect of E-Glass Powder Addition on Characteristics of Blast Furnace Slag-Based Glass Marbles',cite:'Korean J. Mater. Res. 35, 505–510 (2025)',url:'https://doi.org/10.3740/mrsk.2025.35.10.505'},
 {id:'jmca26',kw:'CoFe-LDH',r:'F',j:'J. Mater. Chem. A 2026',t:'CoFe-LDH for AEM water electrolyzers',st:'pub',role:'Coauthor',
  full:'Highly dispersible Fe-rich CoFe-LDH for anion exchange membrane water electrolyzer stacks',cite:'J. Mater. Chem. A (2026)',url:'https://doi.org/10.1039/D6TA03330J'},
 {id:'pero26',kw:'Sb:SnO₂ contacts',r:'F',j:'Submitted 2026',t:'Sb-doped SnO₂ contacts for perovskite solar cells',st:'rev',role:'Coauthor',
  full:'Mixed-Valence Antimony-Doped Tin Oxide as a Self-Hydroxylating Hole-Selective Contact for Inverted Perovskite Solar Cells',cite:'Submitted (2026)'},
];

/* Lineage arrows: [from id, to id, 'L' solid | 'X' dashed]. */
const EDGES=[
 ['am18','as19','L'],['as19','ne20','L'],['ne20','nc22','L'],['nc22','nc23','L'],
 ['nc23','smallsci25','L'],['isci22','nanolett26','L'],['as20','afm24','L'],
 ['matter23','nree26','L'],['nn23','acsn24p','L'],['acsn24p','acsn25','L'],
 ['acsn25','device26','L'],['acsn25','nfl26','L'],['cossms24','nree26','L'],
 ['mrl23','nc24','L'],['gc24','roadmap26','L'],
 ['necryo','ext26','X'],['nc23','gc24','X'],['necryo','g6','X'],
 ['g1','g8','L'],['nree26','g4','X'],
];
