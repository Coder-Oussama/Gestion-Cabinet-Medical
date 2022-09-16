const { ipcRenderer } = require("electron");
const PathData = [
  {
    name: "PARASITOLOGIE",
    Diseases: [
      "paludisme (malariea)",
      "paludisme (prevention)vivax",
      "leishmaniose viscerale",
      "leishmaniose cutanee",
      "toxoplasmose",
      "toxoplasmose grossesse",
      "amibiase histo trt 1",
      "amibiase apres cure trt 2",
      "sequelles d'amibiase(colite)",
      "amibiase hepatique",
      "giardiose (lambliose,flagellose)",
      "trichomonose urogenit(femme)",
      "trichomonose urogenit(homme)",
      "nematodes (oxy,asca,tricho)",
      "nematodes (anky, angui,trichi)",
      "filariose lymph cuata ,cercos",
      "bilaharziose (schistosmose)",
      "distomatose (douve)",
      "cestode (plat) (t sagi soliu)",
      "mycose profonde,candid trt 1",
      "mycose profonde,candid trt 2",
      "ectoparasites cutanees trt 1",
      "ectoparasites cutanees trt 2",
    ],
    logo: "./img/microscope.png",
  },
  {
    name: "RHUMATOLOGIE",
    Diseases: [
      "polyarthtite rhumatoide",
      "polyathritr rhumat (fond)",
      "pelvispondylite rhumatis",
      "SD ocuio uretro synovial ",
      "arthrite temporale ",
      "arthrite rhizomelique ",
      "lupus erythemateux dessin",
      "lupus erytheateux gross",
      "vascularite necrosante doigt",
      "spondylodiscite infectieuse ",
      "spondylarthrite TBC",
      "arthrite a pyogene",
      "arthrite gonococique",
      "arthrite allergique",
      "la goute",
      "la goute (fond)",
      "chonodrocalcinose ",
      "periarthr scapulaire",
      "periarthr scapilo humora",
      "SD canal carpien",
      "tendenite d'insertion ",
      "algie supero tibiale ",
      "caxarthrose",
      "gonarthrose",
      "cervicalgie",
      "algie cervico brachiale",
      "dorsalgie",
      "lombalgie",
      "osteoporose (h )",
      "osteoporose (f )",
      "algo neuro dystrop",
      "necros tete fem",
      "maldie PAGET",
      "k. des os",
      "algie sternale",
      "dle pevis leteral",
      "les antalgiques rhum",
      "SD barre lieon",
      "rachitisme",
    ],
    logo: "./img/rheumatology.png",
  },
  {
    name: "PEDIATRIE",
    Diseases: [
      "Alimentation de NN ",
      "Syphilis congenitale",
      "Toxoplasmose",
      "Deshydratation aigue ",
      "Diarrhee (gastro-enterite) ",
      "kwashiorkor ",
      "convulsion comitiale",
      "Hyperthermie(coup de soleil)",
      "Hyperthermie",
      "oedeme+ Epiglotite ",
      "Croup ( diphterie)",
      "Intoxication hopit",
      "ictere N N thyroid",
      "ictere N N infecti",
      "ِCardiopathie congenitale",
      "ِCardiopathie conge cyanos",
      "Hypothyroidie",
      "Diabete infantile",
      "Insuffisance surrenalienne",
      "hypoglycemie de N N",
      "hypoglycemie nourisson",
      "ٌRougeole",
      "ِCoqueluche",
      "Purpura fulminance",
      "Vaccination 1",
      "2 Vaccination",
      "Bronchit et bronchopneumonie",
      "ٌٌR.A.A enfant (bouillaud)",
      "Torticolis",
      "Maladie coeliaque",
      "Oxyurose ,ascarodose,trichocep",
      "Taeni saginat,hemanolepi nana",
      "Flagelle(giardia,trichomonas",
      "ُErytheme de nourisson",
      "ُEczema de nourisson",
      "Bravais jacksonien",
      "Varciel",
      "Scarlatine ",
      "Erytheme noueux(tbc) ",
      "Bronchite",
    ],
    logo: "./img/height.png",
  },
  {
    name: "O . R . L",
    Diseases: [
      "Otite moyenne",
      "Tympan Infiltré AD",
      "Tympan Infiltré EF",
      "Tympan perforé AD",
      "Tympan perforé EF",
      "Otite sérou bloc EUSTACH",
      "Vertige et MENIERE 1",
      "Vertige et MENIERE 2",
      "Surdite de transm",
      "Eczema de C A E",
      "Furoncle de C A E et du nez",
      "Otite Aigiie",
      "Surdite de recept traum",
      "Epistaxis",
      "Epistaxis par HTA",
      "Rhinite allergiq(E.C.poo20)",
      "Sinusite frontale aigiie 1",
      "Sinusite frontale algiie 2",
      "Sinusite maxillaire (dentaire)",
      "Ethmoidite aigue (enfant)",
      "Polype naso sinual Infecte",
      "Angime aigiie",
      "Angime avec allergie pemicilli",
      "Angine de momo nucleose infect",
      "Angine necrotique ",
      "Rhinite et atteinte des V.R.S CORYZA .(enfant)",
      "Mastoidite",
      "angine enfant",
      "rhinopharyngite .(adulte)",
      "Diphteria",
      "Paralysia faci unilatérale",
      "Cellulite de face-cou",
      "Anosmie grippale et post-trauma",
      "Trouble de L'odorat",
      "Trouble de gout(voir sur ecran)",
      "Surdite de l'enfant",
      "la ryngite.atteinte des cordes,voc",
    ],
    logo: "./img/oto-rhino-laryngologiste.png",
  },
  {
    name: "STOMATOLOGIE",
    Diseases: [
      "douleur de carie",
      "desmadontite(arthite)",
      "nevralgie faciale",
      "abces des dents(cellulite perimaxillaire)",
      "Infect dentaire grossesse",
      "Infect dentaire coeur",
      "syncope d'anesthesie ",
      "choc anaphylactique",
      "hemorragle dentaire",
      "hygiene bucco dentaire",
      "paradontopathie",
      "stomatite , (adenopathie sous mentonnière)",
      "muguet (mycose.candida albicans)",
      "perleche (langue noire.fissure des coins.leucokératose",
    ],
    logo: "./img/brackets.png",
  },
  {
    name: "DERMATOLOGIE",
    Diseases: [
      "Eczema trt 1",
      "Dermatite eczématiforme(atopique)",
      "Urticaire (oedene QUICK)",
      "Prurit(phtiriase inguinale)",
      "Erytheme de ns(dermite de siege)",
      "Prurigo strophulus (ectoparasite)",
      "Psoriasis rosée",
      "pityriasis versicol (nycosique)",
      "intertrigo(nycose)",
      "Candidose(nycose) 1 .ACTIMOMYCES",
      "Candidose(nycose) 2 .MADURA",
      "Lichen plan",
      "Lucite(photo-dermatose)",
      "Pityriasis rosé de(GIBERT)",
      "Inpetigo",
      "Herpès cutaneo nuqueux",
      "Aphtose",
      "Aphte(BEHCET)",
      "Verrues.condylome.cors.durillon",
      "Syphilis 11",
      "Syphilis et allergi a la peni",
      "Syphilis et grossesse",
      "Urethrite gonococcique CH.PIS",
      "Urethrite par treponeme",
      "Chancre mou",
      "Kératoacanthome",
      "Uicere variqueux",
      "Varices",
      "Alopecie diffuse",
      "palade",
      "panaris",
      "Trauma dern",
      "Acnee",
      "Vitiligo",
      "Pyodernite furoncle",
      "Ichtyose",
      "Teigne (derphytose c.cheve)",
      "gale",
      "Anhidros(retentsion sid)",
      "Malade de LEINER MOUSSOUS",
      "Acné necrotique du c.cheveux",
      "Porphyra cut",
      "Hyperhidrose",
      "Zona",
      "Penphigus.penphygoide",
      "Denatose bull infant il",
      "Chaloasma Melasma",
      "Rosacess",
      "Livedo",
      "Hidrosadenite",
      "Xanthomafone",
      "Dernatonyosite(Herner)",
    ],
    logo: "./img/dermatologie.png",
  },
  {
    name: "GYNÉCOLOGIE",
    Diseases: [
      "Infect genitale 1(nicrob.canidose)",
      "Infect genitale 2(nicrob.canidose) ",
      "Infect genital 3",
      "Infect annexielle",
      "Metrorragie(polypes) ",
      "Metrorragie fonction oestrog",
      "Metrorragie function progest",
      " Menace d avortement ",
      "Algie pelvienne(dysmenorrhe)",
      "Endometriose(method blocage d ovulat)",
      "ُEndometriose(method pseudo grossesse)",
      "ُEndometriose(method pseudo menopause)",
      "Infection genital chronique",
      "Microkyste ovarien",
      "Sterilite feminine ",
      "Sterilite feminine hormonale",
      "Steril h.spera normal",
      "Steril h. Oligo sperale",
      "Stimulation ovar,method 1",
      "Stimulation ovar,method 2",
      "Pllu comb classiaque falbl",
      "ٌPllu comb biphas sequentl",
      "Pllu sans oestrogene diabete,prise poid,HTA,trob dig",
      "Pllule a oestrogene",
      "pllu selon l'age <48 ans ",
      "pllu selon l'age >48 ans",
      "ٌٌSalgnem SS pllu de 1-14ej ",
      "Salgnem SS pllu de 15-25ej",
      "Premenopause",
      "Menopause confirmee OESTEOG diminue ,PROGET augm",
      "Amenorrhee II, synechie,",
      "II fonct isolee post pilu",
      "sd CHIARI FROMMEL ameno+gal",
      "ُamenorrhe de post partun ",
      "Herpes genitale ",
      "malad ,BOHEN et PAGET",
      "STEIN LEVENTHAL ",
    ],
    logo: "./img/gynecology.png",
  },
  {
    name: "OBSTÉTRIQUE",
    Diseases: [
      "gross+HTA",
      "gross+infact urologique",
      "gross+virus",
      "gross+Bacteries",
      "gross+protozaires",
      "menace d'Avortement",
      "menace avort dange hop",
      "gross+medic interdits",
      "suite de couches",
      "Infact puerperale",
      "etat depressif puerperal",
      "phlebite",
      "hypogalactie",
      "engorgement des seins",
      "crevasses",
      "lynphanglite",
      "abces du sein",
      "arret d'allaitement",
      "post partum",
      "réno-lombalgie de grossesse",
      "sciatique de groussess",
      "relâchement de synphus",
      "douleur abdominale grosse",
      "prurit de groussesse",
      "TBC évolutive et grossesse",
      "grossesse de normal",
      "tuberculose genitale",
      "mastite carcinomateuse puerpérale",
      "spanioménorrhée(intervalle long)",
      "pollakiménorrhée(gtt heno a repet)",
      "oligoménorrhée(tres peu de sang) ",
      "polymenorrhée (sang abondant)",
      "henorragle internodiaire",
      "cycle ANOVULATOIRE",
      "menace d'avortement a repetition",
    ],
    logo: "./img/obstetrical.png",
  },
  {
    name: "GRANDES URGENCES",
    Diseases: [
      "accidente",
      "hypothermie",
      "brulure (hopital)",
      "gelure",
      "électrification",
      "noyade",
      "pendison",
      "brulure",
      "medicaments d'urgence",
    ],
    logo: "./img/emergency-call.png",
  },
  {
    name: "OPHTALMOLOGIE",
    Diseases: [
      "examen OPHT",
      "blepharite(oeil rouge)",
      "conjonctivite(oeil rouge)",
      "Iridocylite(oeil rouge)",
      "glaucome algii",
      "corps étranger conjoactival",
      "oeil et medicaments",
      "chalazion",
      "équipement et cabinet ned.OPHT",
      "fond d'oeil",
      "glaucome",
      "cataracte",
      "médicaments en ophtalmologie",
      "les kératites",
      "trachome",
      "Uvelite",
      "Uvelite serouse",
      "Decollement de la retitue",
      "Névrite optique",
      "Glaucome congestive",
      "Syndrome de l'oeil sec",
      "Drgelet",
      "Xanthelazma",
      "Avitaminose A",
      "Syndrome de ROthmund",
      "Zona ophtainique",
    ],
    logo: "./img/ophthalmology.png",
  },
  {
    name: "PNEUMO-PHTISIOLOGIE",
    Diseases: [
      "inf resp hypercapnie hopit",
      "inf resp hypercapnie ",
      "hypoxémie",
      "Bronchite chronique",
      "asthme Bronchite",
      "asthme trt fond",
      "tbc attaque",
      "tbc millitaire",
      "tbc ganglionnaire",
      "p.pathi a pneumocoque",
      "p.pathi a hemoph influenzea",
      "p.pathi a staphylocoque",
      "p.pathi a pseudomonas(pyogene)",
      "p.pathi a klebsiella pneumonia(b.FIEDLAMDER)",
      "p.pathi a anaerobie fusiformis",
      "p.pathi yarasi(mycoplasma)",
      "pneumopathie virale",
      "pneumothorax infectieux",
      "pneumothorax tbc",
      "pleurésie purulente",
      "pleurésie sero fibrineuse",
      "dilatation des bronches",
      "mucoviscidose respiratoire",
      "mucoviscidose pancreatique",
      "inf.mycobact montbc(kansasii)",
      "mycob.(aviun.serofulacean )",
      "sd LDEFLLER",
      "embolie pulmonaire",
      "cancer des bronches",
      "pneumoconiose",
      "bronchite aigue",
    ],
    logo: "./img/pulo.png",
  },
  {
    name: "DIGESTIF",
    Diseases: [
      "hernie hiatale",
      "oesophagite (uice.petiq)",
      "oesophagite acoustique",
      "hémorragie digestive 1",
      "hémorragie digestive 2",
      "ulcère gastrique 1",
      "ulcère gastrique 2",
      "cirrhose compliquée",
      "ascite",
      "encephalopathie hépatique",
      "hépatite virale",
      "hépatite alcoolique",
      "lithiase biliaire",
      "angiocholite .cholecystite",
      "pancréatite aiguë",
      "pancréatite chronique",
      "crohn (r. c. h )",
      "entérocolite membr par AB",
      "r.c.ulcéreuse hémorragique",
      "rectite et amorectite",
      "hémorroïdes",
      "fissures anales",
      "gastrite",
      "Douleurs(H.C.D) pos.operation",
      "Constipation/l/ 40/Constip/ll/",
      "Colopathie fonctionnelle",
      "entérocolite non spécifique",
      "appendicite chronique",
      "rectite",
      "anusite et periawsite",
      "névralgie ano-rectale",
      "dysenterie bacil(Flex.shiga)",
      "maladie de WILSON",
      "maladie de whipple",
      "Kyste hydatique",
      "occlusion intestinale- MECKEL",
      "k.d'estomac",
      "Syndrome Dumping",
      "Stéatose hépatique",
    ],
    logo: "./img/stomach.png",
  },
  {
    name: "NEPHRO UROLOGY",
    Diseases: [
      "oedème nephrotique",
      "hématurie terminale",
      "hématurie totale nephro",
      "pyélonéphrite",
      "infc urinaire récidivante",
      "colique néphrétique",
      "nephropathie glomerulaire(HTA)",
      "nephropathie glomerulaire sans HTA",
      "néphropathie proliferative",
      "isf rénale aigue",
      "lithiase uratique",
      "lithiase calcique",
      "lithiase cystique",
      "tbc uro-génitale",
      "orchiepididymite",
      "adénome prostatique",
      "néphropathie et gross",
      "HTA et gross",
      "phénosis",
      "Énurésie",
      "urétrite gonococcique",
      "urétrite a treponeme",
      "tumeur vésicale",
      "hydronéphrose",
    ],
    logo: "./img/UROLOGY.png",
  },
  {
    name: "CARDIOVASCULAIRE",
    Diseases: [
      "insuffisance cardiaque congestive I",
      "insuffisance cardiaque congestive II",
      "O . A . P",
      "angine de poitrine I",
      "angine de poitrine II",
      "Infarctus de myocarde",
      "troubles de rythme ventricu",
      "troubles de rythme auriculaire",
      "bloc sino-auriculaire",
      "bradycardie sans syncope",
      "fibrillation auriculair",
      "tachysystolie auriculaire 120-200",
      "tachycardie jonctionnelle BOUVERET",
      "E.SYSYST. supraventriculaire",
      "E.SYS ventricul sans P hypo K+",
      "tachycardie ventriculaire",
      "torsade de pointé",
      "E . C . G plat",
      "phlébite et embolie poimonaitre",
      "R . A . A Adulte",
      "R . A . A Adulte",
      "H . T . A Essonsielle",
      "H . T . A En urgence",
      "arteriopathie des membres infé",
      "insuffisance cardiaque globale",
      "H . T . A cardipathie",
      "H . T . A dyspnee+cardionegalle",
      "hypotension orthoststique",
      "pericardite avec épanchement",
      "aortite syphilitique",
      "rétrécissement isthme aortique",
      "anévrisme de crosse aortique",
      "thrombose veineuse",
      "palpitation enoltive",
      "antihypertensifs I",
      "antihypertensifs II",
    ],
    logo: "./img/cardiovascular.png",
  },
  {
    name: "NEUROLOGIE",
    Diseases: [
      "coma neurologique",
      "H T ic",
      "algie cranio faciale",
      "migraine trt fond",
      "aigie facio orbitaire(vasculaire)",
      "polynévrite",
      "delirium trunons",
      "encephalite alcool(KORSA-WERNICKE)",
      "epilepsie grand mal.adulte",
      "epilepsie petit mal.adulte",
      "epilepsie petit mal.enfant",
      "epilepsie grand mal.enfant",
      "sd du KEST",
      "bravais jacksonion",
      "parkinson",
      "myasthenie-Crampe musculaire",
      "céphalée simple",
      "névralgie intercostale",
      "Lombo sciatique",
      "nevralgie(prest , f, ext, cuiss)",
      "Insomnie",
      "Paralysie faciale",
      "Sclérose en plaque",
      "Chorée de SYDEMIOM",
      "myasthénie ERB-GOLDFLAM",
      "myasthénie FACIO S HUMORClandouxy dejuris",
      "torticolis algie S.C MASTDID",
      "syndrome méningé",
      "paraly gele(BAYLE) M.E.SYPHILIS",
      "tabès",
      "majad de GUILLAM SARRE",
      "sclerose an plaque",
      "hemorry menique arachnoid",
      "encephalopathie congeltrisonie 21",
      "encepha acquise et métabolique cong",
      "dys.DUCHEMIN",
      "Hémiplégie H T A",
      "Hémiplégie par rangement",
      "Polymyosite sans signcut",
      "pellagre",
    ],
    logo: "./img/NEUROLOGIE.png",
  },
  {
    name: "ANTIBIOTIQUES",
    Diseases: [
      "quinolone",
      "aminosides",
      "aminopenicilline(beta lactamine)",
      "penicilline G (beta lactamine)",
      "carboxypenicilline",
      "cephalosporine",
      "chloramphenicol",
      "tétracycline",
      "lincosamide",
      "phenoxy pénicilline",
      "isoxazolyl pénicilline",
      "macrolide",
      "anti tuberculeux",
      "polypeptide",
      "sulfamide",
      "urèido pénicilline",
      "nitrofurane",
      "synergistine",
      "furazolidone",
      "rifamycine",
    ],
    logo: "./img/ANTIBIOTICS.png",
  },
  {
    name: "PROBABILITES DES GERMES CAUSAUX",
    Diseases: [
      "abcès du cerveau",
      "abcès des poumons",
      "arthrite de M M",
      "arthrite de l'adulte",
      "angine érythémateuse",
      "bronchite chronique adulte",
      "bronchopneumonie",
      "bronchopneumonie terrain faible",
      "colite pseudomembraneuse",
      "cystite aiguë récidivante I",
      "cystite aiguë récidivante II",
      "endocardite d'OSLER",
      "endocardite aigiie",
      "endocardite sur prothèse I",
      "endocardite sur prothèse 2",
      "épiglottite",
      "gastro entérite polynucleaire",
      "méningite du M M",
      "méningite du nourrisson",
      "ostéomyélite",
      "otite aiguë du M M",
      "otite chronique",
      "pneumonie lobaire",
      "prostatite",
      "sinusite aiguë",
      "spondylodiscite",
      "arthrite",
      "cholécystite",
    ],
    logo: "./img/GERMES.png",
  },
  {
    name: "GRANDS SYNDROMES INFECTIEUX",
    Diseases: [
      "septicémie à staphylo",
      "septicémie à strepto",
      "septicémie à strop D d'endocad",
      "septicémie à strop g negatif",
      "f. typhoide paratyphoide",
      "brucellose 16",
      "septicémie à anaérobie sporulee",
      "septicémie à anaérobie non sporulee",
      "septicémie à méningocoque hopital",
      "septicémie à gonocoque hopital",
      "septicémie origine pharynx poumon",
      "septicémie d'origine cutanee(de face)",
      "septicémie d'origine biliaire",
      "septicémie d'origine rein - pancreas",
      "septicémie d'origine urinaire",
      "septicémie d'origine genitale",
      "endocardite infectieuse I",
      "endocardite infectieuse II",
      "endocardite staphylo",
      "endocardite á g negatif",
      "méningite purulente",
      "méningite á D PFEIFER",
      "méningite á liquide claire",
      "diarrhee bactérienne",
      "diarrhée choleriforme",
      "leptospirose",
      "diphtérie",
      "tetamos B NICOLATER",
      "lymphogranulome veni NICOLAS.FA",
      "infection á mycoplasme",
      "maladie légionnaires climat",
      "yersiniose.pasteurellose(pest)",
      "rickettsiose(typhus exantheme)",
      "lèpre tuberculoide",
      "lèpre lepromateuse",
      "État grippal I et sd REYE",
      "État grippal II",
      "Adenit inuguin",
      "Variol",
      "Oreil",
      "griffe de chat",
    ],
    logo: "./img/SYNDROMES.png",
  },
  {
    name: "PSYCHIATRIE",
    Diseases: [
      "depression (melancolie)",
      "depression grave(acce melancolique)",
      "etat d'excitation ",
      "etat de confusion et excitation",
      "nevrose obssessionelle",
      "nevrose hysterique",
      "nevrose phobique",
      "nevrose d'angoisse",
      "hypochondre",
      "asthenie aigue nevrotique",
      "schizophrenie delirante hebephrenique(schizo aigue) ",
      "schizophrenie paranoid delirant ",
      "Bouffee delirante",
      "demence atrophique du cerveau pick alzheimer",
      "demence par accident cerebral ",
      "toxicomanie et alcoolisme ",
      "toxicomanie des drogues ",
      "depression nevrotique ",
      "depression de schizophrene ",
      "maniaque agite",
      "maniaque après sedation",
      "maniaque trt d'entretient",
      "hypo maniaque ",
      "nevrose traumatique",
      "confusion cerebrale orga",
      "schizophrenie reduite",
      "schizophrenie deficitaire ",
      "psychose puerperale,post,p",
      "epilepsie grand mal",
      "epilepsie partielle LOCALE",
      "absence epileptique",
      "epilepsie petit mal enf",
      "norolep1",
      "norolep2",
      "norolep3",
      "anxioly",
      "hypnot",
      "histam/barb",
      "A-de impi/",
      "A-denoni",
      "A-IMAO",
      "stimul",
      "A-alcoo tab",
      "A-taba",
    ],
    logo: "./img/PSYCHIATRIE.png",
  },
  {
    name: "METABOLISME ET ENDOCRINOLOGIE",
    Diseases: [
      "DID 20-28 mode 1",
      "DID 20-28 mode 2 ",
      "DID 20-28 mode3 ",
      "DID 35-55 ans  ",
      "DID 60 et plus mode 1",
      "DID 60 et plus mode 2",
      "moyens d'analyse du urines",
      "moyens d'analyse du sang",
      "Hypoglycemie ",
      "(mody) ou obese 1'' DNID sulfamide",
      "(mody) ou obese 2 DNID sulfamide",
      "DNID biguanide",
      "Acido-citose(C.Cglycos.glyce 4g/l)",
      "ِHyperlipidemie(conduite et regime)",
      "Hyperlipidemie (medication 1)",
      " Hyperlipidemie (medication II)",
      "Insuf surren lente (ADDISON)",
      "ET MELANODERMIE ==aigue",
      "Hyper thyroidie BASEDOH",
      "Hyper thyroidie crise ",
      "Hypo thyroidie",
      "Goitre euthyroidien",
      "HASHIMOTO anti corps anti thyr",
      "Hypo para thyrodie",
      "Hyper para thyrodie ",
      "Hyper calcemie aigue",
      "ٌHyper toleree ex.com mend 26",
      "tetanie , spasmophilie",
      "sd TURNER",
      "sd KLIENFELTER",
      "Hypercorticime (hirsutisme)",
      "Impuissance sex hypogonadisme",
      "Porphyrie ",
      "Insulinoresist(mend10,11,12;15)",
      "Acromegaliet( tun. Hypophysaire)",
      "Gigantisme (tum.hypophysaire)",
      "insuf ante hypohys (sheehan)",
      "Anorexie mentale",
      "sd adipogenit (babinski-frehlesh)",
      "Diabete insipide",
      "Testicul femin hermophrod nascu",
      "Compression de tum. hypophysaire",
      "Cushing",
      "Frigilite (femme)",
      "Manqué d'erection",
      "priapisme",
    ],
    logo: "./img/ENDOCRINOLOGIE.png",
  },
  {
    name: "HEMATOLOGIE",
    Diseases: [
      "anemie aigue",
      "anemie chronique microcyt hypochr ",
      "anemie hemalytique MINKOU. CHAUFFARD",
      "Thalassemie majeure ",
      "Hemolyse auto immune",
      "anemie par hypothyroidie",
      "Anemie megaloblastique",
      "anemie defaut eruthropoi",
      "hemophilie A B f VIII IX ",
      "Fibrinolyse primaire",
      "Leucemie lymphoblastique ni B T",
      " LAL a lymophoblaste T B",
      "Leuce aigue myeloblastique (M1M2)",
      "leuce aigue promyelocytaire(M3)  ",
      "VAGUEZ sd myeloproliferatif",
      "leucemie myeloide chronique",
      "Slenomegalie myeloide",
      "myelome multiple ",
      "waldenstron,prolifie lymphoide B augmentation de lg M",
      "Hodgkin I II ",
      "Ethiologie de slenomegalie ",
    ],
    logo: "./img/HEMATOLOGIE.png",
  },
  {
    name: "INTOXICATION MEDICAMENTEUSE",
    Diseases: [
      "intoxication par asprine",
      "intoxication par barbiturique",
      "intoxication par carbamate",
      "intoxication par digitaline",
      "intoxication par dérivés tricyclique",
      "asthénie",
      "toniques 1",
      "intoxication par oxycarbonnes",
      "botulisme",
      "saturnisme",
      "accident sérique",
      "coup de soleil",
    ],
    logo: "./img/drugs.png",
  },
  {
    name: "MEDICAMENTS SECOURS",
    Diseases: [
      "medicament 1",
      "medicament 2",
      "medicament 3",
      "medicament 4",
      "medicament 5",
    ],
    logo: "./img/RESCUE MEDICINES.png",
  },
  {
    name: "REGIMES",
    Diseases: [
      "Enfants de 1-3  mois au lait de vache en poudre",
      "Enfants de 4-7  mois  au lait de vache en poudre",
      "Enfants de 8-13 mois  au lait de vache en poudre",
      "Enfants de allaité au sein au lait de vache en poudre",
      "Enfants de allaite mixte au lait de vache en poudre",
      "Regime de diabetique insulin- dependant",
      "Regime de diabetique non insulin - dependant obese",
      "Regime hypo-calorique , pour des personnes obeses",
      "liste medicaments de psychiatrie",
      "neuroleptiques",
      "tranquilisants",
      "hypnotiques",
      "Antidepressifs",
      "Regime plus",
      "Regime pour grossir",
      "Regime pour femme enceinte , allaite, adolescent",
      "Regime pour personne plus de 65 ans ",
      "Regime pour enf.de 4-12 mois ,etde 1-2 ans",
      "Regime pour estomac delicat",
      "Regime pauvre en Na+",
      "Regime sans Na+ ,riche en pt",
      "Regime contre la goutte",
      "regime bebe",
      "LAITS BEBES//",
      "infractus",
      "suite de lait bebe",
    ],
    logo: "./img/diet.png",
  },
  {
    name: "CERTIFICATS",
    Diseases: [
      "Certificat 01",
      "Certificat 02",
      "Certificat 03",
      "Certificat 04",
      "Certificat 05",
      "Certificat 06",
      "Certificat 07",
      "Certificat 08",
    ],
    logo: "./img/CERTIFICATES.png",
  },
  {
    name: "PEAU ET AFFECTIONS GENERALES",
    Diseases: [
      "dermato de diabete",
      "dermato d'analyse",
      "dermato de mucinose",
      "dermato de l'hypothyroidien",
      "dermato de l'hyperthyrodien",
      "dermato de myxoedeme",
      "dermato de l'hypoparathyroidien",
      "dermato de l'hyperparathyroidien",
      "dermato de cushing",
      "dermato d'acromegalie",
      "dermato d' hyppoituitarisme ",
      "dermato d'addisonien",
      "dermato de pellagreux",
      "dermato de carence nutritionnelle",
      "dermato de mal absorption",
      "dermato de rectite hemorragie (CROHN)",
      "dermato de polypose intestinale ",
      "dermato de cirrhotique",
      "dermato de hemachronatose ",
      "dermato d'hepatite chronique",
      "dermato de carcinome de foie",
      "dermato de necrose pancreatique",
      "dermato de tumeur glucagonome",
      "dermato de R.A.A",
      "derm de mal perfortant plantaire",
      "derm d'acropathie ulceree",
      "ٌٌderm de Hodgkin.lymphome profonde",
      "derm de goutteux",
      "derm d'adenocarcinome gastrique",
      "derm K.pilm.ovar.pharynx.leucemie",
      "dermo de  K . intrathoracique",
      "dermo dedeficat immunitaire",
      "Liste indicative I",
      "Liste indicative II",
    ],
    logo: "./img/SKIN.png",
  },
];

function PathTemplate(path) {
  return `
    <li class="col-3 patho">
    <a>
        <img src="${path.logo}"  height="50px" width="50px" alt="logo">
          <span class="ml-4 pathName">${path.name}<span>
    </a>    
    </li>
      `;
}
document.getElementById("PATH").innerHTML = PathData.map(PathTemplate).join("");
let maladie = document.querySelectorAll("ul li");
maladie.forEach(function (el) {
  el.addEventListener("click", function (e) {
    let des = PathData.filter(function (ele) {
      if (ele.name === el.innerText) {
        return ele;
      }
    });
    let dataMaladie = des[0].Diseases;
    let NamePath = des[0].name;
    ipcRenderer.send("openmaladie-page", dataMaladie, NamePath);
    e.preventDefault();
  });
});

/*function page2(){
 
 
  let con=document.querySelector('#Diseases');
 for(let i=0; i<data.length;i++){
      let li=` <li class="col-3 patho ">
      <a href="#">
              <span class="ml-4 ">${data[i]}<span>
      </a>    
   </li>`;
   con.append(li);
  };
  

}*/
