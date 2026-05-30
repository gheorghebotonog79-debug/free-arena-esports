import type { Locale } from "@/i18n/routing";
import type { ServerSeoSlug } from "@/data/servers/seo-pages";

type LandingCard = {
  title: string;
  copy: string;
};

type LandingGalleryItem = {
  alt: string;
  copy: string;
  image: string;
  title: string;
};

type LandingLink = {
  copy: string;
  href: string;
  title: string;
};

export type ServerLandingPageContent = {
  communityBody: readonly string[];
  communityTitle: string;
  connect: {
    intro: string;
    note: string;
    steps: readonly string[];
    title: string;
  };
  eyebrow: string;
  features: readonly LandingCard[];
  featureTitle: string;
  gallery: readonly LandingGalleryItem[];
  galleryIntro: string;
  galleryTitle: string;
  internalLinks: readonly LandingLink[];
  internalLinksTitle: string;
  intro: string;
  maps: readonly LandingCard[];
  mapsIntro: string;
  mapsTitle: string;
  rules: readonly string[];
  rulesIntro: string;
  rulesTitle: string;
  title: string;
  vipBenefits: readonly LandingCard[];
  vipIntro: string;
  vipTitle: string;
};

export const serverLandingPages: Partial<
  Record<ServerSeoSlug, Partial<Record<Locale, ServerLandingPageContent>>>
> = {
  "cs16-classic": {
    ro: {
      eyebrow: "Landing page premium",
      title: "Server CS 1.6 Romania pentru joc clasic, comunitate si ranking",
      intro:
        "FREE-ARENA CS 1.6 Classic este construit ca pagina principala pentru jucatorii care cauta un server romanesc stabil, usor de conectat si suficient de serios incat sa merite reveniri zilnice. Nu este doar o lista de IP-uri: este un punct complet cu instructiuni, beneficii, reguli, harti, comunitate si linkuri utile.",
      connect: {
        title: "Cum te conectezi pe CS 1.6 Classic",
        intro:
          "Conectarea trebuie sa fie simpla pentru jucatorul nou si rapida pentru jucatorul care revine in fiecare seara. De aceea pagina pastreaza IP-ul vizibil, butonul de join si contextul minim necesar ca intrarea pe server sa nu depinda de forumuri vechi sau liste externe.",
        steps: [
          "Deschide Counter-Strike 1.6 din Steam sau clientul pe care il folosesti in mod legal.",
          "Apasa tasta pentru consola si scrie connect 217.156.22.74:27015.",
          "Daca preferi interfata grafica, adauga serverul la Favorites folosind adresa 217.156.22.74:27015.",
          "Verifica numele jucatorului inainte de conectare, ca staff-ul si comunitatea sa te poata identifica usor.",
          "Intra pe Discord sau TeamSpeak daca vrei anunturi, suport, mixuri si discutii rapide cu echipa FREE-ARENA.",
        ],
        note:
          "Daca serverul apare temporar offline in browserul jocului, copiaza IP-ul direct si incearca din consola. Uneori lista Steam se actualizeaza mai greu decat raspunsul real al serverului.",
      },
      featureTitle: "De ce pagina aceasta trebuie sa fie cea mai puternica pentru CS 1.6",
      features: [
        {
          title: "Identitate clara",
          copy:
            "Multi jucatori cauta simplu: server CS 1.6 Romania, server Counter-Strike 1.6 romanesc sau server clasic cu admini activi. Pagina raspunde direct acestor cautari, dar ramane utila si pentru oameni reali, nu doar pentru crawler. IP-ul, harta, comunitatea, regulile si suportul sunt grupate intr-un traseu logic.",
        },
        {
          title: "Gameplay clasic",
          copy:
            "Serverul pastreaza spiritul Counter-Strike 1.6: runde clare, harti cunoscute, economie de echipa si dueluri in care sunetul, reflexul si pozitionarea conteaza. Continutul este scris pentru jucatori care vor o experienta recognoscibila, nu un mod confuz incarcat cu artificii.",
        },
        {
          title: "Staff si suport",
          copy:
            "O pagina buna de server trebuie sa explice si ce se intampla cand apare o problema. FREE-ARENA pune accent pe canale vizibile de raportare, prezenta de staff, anti-cheat, reguli scurte si posibilitatea ca jucatorii sa ajunga rapid pe Discord, TeamSpeak sau forum.",
        },
        {
          title: "Crestere SEO curata",
          copy:
            "Continutul este organizat in sectiuni care pot fi citite de Google si de jucatori: conectare, beneficii, harti, reguli, comunitate si intrebari frecvente. Fiecare bloc adauga semnale naturale pentru cautari romanesti fara sa dubleze rutele vechi /servers.",
        },
      ],
      vipTitle: "Beneficii VIP pentru jucatori activi",
      vipIntro:
        "VIP-ul este pozitionat ca o recompensa pentru prezenta si sustinere, nu ca o scurtatura care strica echilibrul. Pentru un server clasic, beneficiile trebuie sa fie vizibile, dar controlate, astfel incat un jucator nou sa simta ca poate concura corect.",
      vipBenefits: [
        {
          title: "Identitate in comunitate",
          copy:
            "VIP-ul poate oferi tag vizibil, prezenta mai clara in chat si statut recunoscut in comunitate. Pe termen lung, aceasta identitate poate fi legata de conturi, profiluri, progres si evenimente FREE-ARENA.",
        },
        {
          title: "Acces la experiente",
          copy:
            "Jucatorii care sustin serverul pot primi prioritate la seri tematice, mixuri, testari si anunturi. Scopul este sa construim o comunitate care revine pentru oameni, nu doar pentru un avantaj mecanic.",
        },
        {
          title: "Beneficii controlate",
          copy:
            "Pe un server CS 1.6 Classic, orice beneficiu trebuie calibrat astfel incat rundele sa ramana corecte. Pagina comunica direct acest principiu: VIP-ul sustine comunitatea, dar gameplay-ul ramane citibil si competitiv.",
        },
      ],
      mapsTitle: "Harti potrivite pentru CS 1.6 Classic",
      mapsIntro:
        "Harta decide ritmul unui server clasic. FREE-ARENA trebuie sa pastreze o rotatie recognoscibila pentru jucatorii romani, cu suficiente optiuni pentru sesiuni lungi, dar fara sa piarda identitatea Counter-Strike 1.6.",
      maps: [
        {
          title: "de_dust2",
          copy:
            "Cea mai cautata harta pentru servere romanesti de CS 1.6. Dust2 ramane perfecta pentru intrare rapida, dueluri clare, smoke-uri simple si runde pe care jucatorii le inteleg imediat.",
        },
        {
          title: "de_inferno",
          copy:
            "Inferno aduce joc de echipa, control de banana, retake-uri si comunicare reala. Este ideala pentru serile in care comunitatea vrea mai mult decat fraguri rapide.",
        },
        {
          title: "de_nuke",
          copy:
            "Nuke cere sunet, timing si coordonare. Pe o comunitate stabila, harta diferentiaza jucatorii care stiu sa citeasca rotatiile de cei care se bazeaza doar pe reflex.",
        },
        {
          title: "de_train",
          copy:
            "Train ramane o alegere buna pentru jucatorii vechi, pentru dueluri pe distante lungi si pentru runde in care pozitionarea conteaza mai mult decat miscarea haotica.",
        },
      ],
      rulesTitle: "Rezumat reguli pentru un server curat",
      rulesIntro:
        "Regulile trebuie sa fie scurte, aplicabile si usor de inteles. O comunitate romaneasca buna nu are nevoie de un regulament imposibil de citit, ci de cateva principii ferme.",
      rules: [
        "Fara coduri, wallhack, aim, scripturi abuzive, exploituri sau orice forma de avantaj artificial.",
        "Respecta adminii si jucatorii; toxicitatea constanta, injuriile si provocarile pot duce la sanctiuni.",
        "Joaca obiectivul hartii si evita blocarea intentionata a rundei sau sabotarea coechipierilor.",
        "Nu face reclama catre alte servere, comunitati sau servicii fara acordul staff-ului.",
        "Raporteaza problemele pe Discord, TeamSpeak sau forum cu detalii clare: nick, ora, harta si motiv.",
      ],
      communityTitle: "Comunitatea FREE-ARENA in jurul serverului clasic",
      communityBody: [
        "Un server CS 1.6 poate avea IP, harti si pluginuri bune, dar fara comunitate devine doar un rand intr-o lista. FREE-ARENA foloseste pagina aceasta ca punct de intrare pentru jucatori noi, dar si ca baza pentru cei care revin. Cand cineva cauta server romanesc de CS 1.6, trebuie sa gaseasca rapid cine suntem, cum se intra, ce reguli exista si unde poate vorbi cu staff-ul.",
        "Discordul este potrivit pentru anunturi, raportari rapide, discutii de seara si feedback despre harti. TeamSpeak ramane important pentru jucatorii care vor voice stabil in timpul jocului, mixuri si comunicare fara zgomot. Forumul pastreaza zona mai structurata: cereri, reclamatii, reguli si subiecte care trebuie vazute si dupa cateva zile.",
        "Obiectivul pentru FREE-ARENA CS 1.6 Classic este sa devina un reper romanesc, nu doar un server temporar. Asta inseamna continut indexabil, rute stabile, schema corecta, sitemap curat si pagini care raspund la intrebari reale. Cand un jucator citeste aceasta pagina, trebuie sa inteleaga ca exista o echipa in spate si ca serverul are o directie.",
        "Pentru cautarile romanesti, diferenta dintre o pagina slaba si o pagina puternica este utilitatea reala. Un jucator care ajunge aici trebuie sa poata copia IP-ul, intelege hartile, vedea regulile, gasi comunitatea si decide rapid daca serverul merita salvat la favorite. Aceasta pagina este scrisa ca un ghid complet, nu ca o reclama scurta, pentru ca FREE-ARENA vrea autoritate pe termen lung in zona serverelor CS 1.6 din Romania.",
      ],
      galleryTitle: "Screenshot gallery si preview-uri de experienta",
      galleryIntro:
        "Galeria foloseste preview-uri vizuale pentru zonele importante ale experientei: conectare, status live si comunitate. Pe masura ce apar capturi reale din joc, aceasta sectiune poate primi imagini din meciuri, evenimente si seri competitive.",
      gallery: [
        {
          title: "CS 1.6 Classic live",
          copy:
            "Preview pentru identitatea serverului clasic, cu accent pe IP, status si intrare rapida in joc.",
          image: "/assets/game-icons/CS.png",
          alt: "Preview FREE-ARENA CS 1.6 Classic",
        },
        {
          title: "Status si ranking",
          copy:
            "Zona de status si progres ajuta jucatorii sa vada rapid activitatea si sa revina cu obiective clare.",
          image: "/assets/game-icons/F.png",
          alt: "Preview status FREE-ARENA CS 1.6",
        },
        {
          title: "Comunitate conectata",
          copy:
            "Discord, TeamSpeak si forumul completeaza serverul cu suport, voice si organizare pentru jucatori.",
          image: "/assets/brand/free-arena-icons-preview.png",
          alt: "Preview comunitate FREE-ARENA",
        },
      ],
      internalLinksTitle: "Linkuri interne utile",
      internalLinks: [
        {
          title: "Server Respawn CS 1.6",
          copy: "Pentru warm-up, dueluri rapide si actiune continua in aceeasi comunitate.",
          href: "/server/respawn",
        },
        {
          title: "Server CS2 FREE-ARENA",
          copy: "Pentru jucatorii care vor directia moderna Counter-Strike in ecosistemul FREE-ARENA.",
          href: "/server/cs2",
        },
        {
          title: "Toate serverele",
          copy: "Vezi status live, IP-uri, ping si serverele pregatite pentru comunitate.",
          href: "/servers",
        },
      ],
    },
  },
  respawn: {
    ro: {
      eyebrow: "Landing page premium",
      title: "Server Respawn CS 1.6 Romania pentru warm-up si fraguri rapide",
      intro:
        "FREE-ARENA Respawn este construit pentru jucatori care vor actiune imediata, antrenament constant si dueluri dese. Pagina explica modul, conectarea, beneficiile, hartile, regulile si comunitatea din jurul serverului, astfel incat cautarile romanesti pentru CS 1.6 Respawn sa gaseasca un raspuns complet.",
      connect: {
        title: "Cum intri pe serverul Respawn",
        intro:
          "Un server respawn trebuie sa fie la un pas distanta. Jucatorii intra pentru incalzire, pentru reflex, pentru spray control sau pentru o sesiune scurta dupa munca, asa ca traseul de conectare trebuie sa fie rapid si fara confuzie.",
        steps: [
          "Porneste Counter-Strike 1.6 si deschide consola jocului.",
          "Scrie connect 51.38.97.243:27015 si confirma comanda.",
          "Adauga 51.38.97.243:27015 la Favorites daca vrei sa revii rapid.",
          "Alege un nume recognoscibil si evita tagurile care copiaza staff-ul sau alti jucatori.",
          "Intra pe Discord sau TeamSpeak pentru reclamatii, suport, propuneri de harti si anunturi.",
        ],
        note:
          "Respawn este gandit pentru ritm rapid. Daca vii de pe Classic, asteapta-te la mai multe dueluri pe minut, rotatii mai dese si o presiune constanta pe reflex si decizie.",
      },
      featureTitle: "De ce Respawn merita o pagina separata",
      features: [
        {
          title: "Actiune continua",
          copy:
            "Jucatorii care cauta Respawn nu vor sa astepte finalul unei runde. Vor sa revina imediat, sa repete dueluri, sa testeze unghiuri si sa simta ca fiecare minut produce progres. Pagina comunica acest lucru direct.",
        },
        {
          title: "Antrenament real",
          copy:
            "Respawn este excelent pentru spray control, prefire, tracking, schimbare de pozitii si adaptare la adversari diferiti. Nu inlocuieste meciurile clasice, dar pregateste mecanic jucatorul pentru ele.",
        },
        {
          title: "Comunitate rapida",
          copy:
            "Pentru ca ritmul este intens, moderarea trebuie sa fie vizibila. FREE-ARENA le ofera jucatorilor canale clare pentru raportari, propuneri si discutii, astfel incat energia serverului sa ramana competitiva, nu toxica.",
        },
        {
          title: "SEO pentru intentie clara",
          copy:
            "Cautarile pentru server respawn CS 1.6 Romania au intentie diferita fata de serverele clasice. Aceasta pagina foloseste continut dedicat modului, nu text copiat, si poate atrage jucatori care cauta exact incalzire si duel rapid.",
        },
      ],
      vipTitle: "VIP pe Respawn fara dezechilibru",
      vipIntro:
        "Pe un server rapid, beneficiile VIP trebuie sa fie gandite cu grija. Scopul este sa recompensam jucatorii activi si sustinatorii comunitatii fara sa transformam fiecare duel intr-o situatie nedreapta pentru cei noi.",
      vipBenefits: [
        {
          title: "Prezenta vizibila",
          copy:
            "VIP-ul poate oferi identitate, tag si recunoastere in comunitate. Pentru un server Respawn, aceasta vizibilitate conteaza pentru jucatorii care intra zilnic si devin parte din ritmul serverului.",
        },
        {
          title: "Acces la seri tematice",
          copy:
            "Respawn se potriveste cu evenimente scurte: challenge-uri de headshot, seri de pistol, harti speciale sau sesiuni de warm-up inainte de meciuri. VIP-ul poate deveni o cale de implicare in aceste momente.",
        },
        {
          title: "Suport pentru dezvoltare",
          copy:
            "Beneficiile VIP sustin infrastructura, dar pagina ramane transparenta: experienta de baza trebuie sa fie buna si pentru jucatorul fara VIP. Serverul creste daca toata lumea se simte binevenita.",
        },
      ],
      mapsTitle: "Harti recomandate pentru Respawn",
      mapsIntro:
        "Respawn are nevoie de harti care livreaza contact rapid, dar nu devin sufocante. O rotatie buna alterneaza spatii deschise, coridoare, pozitii de aim si zone in care jucatorii pot repeta dueluri relevante.",
      maps: [
        {
          title: "de_dust2",
          copy:
            "Perfecta pentru warm-up general, long, short, mid si B tunnels. Jucatorii cunosc unghiurile, asa ca pot lucra direct la reflex si precizie.",
        },
        {
          title: "de_inferno",
          copy:
            "Buna pentru control de banana, dueluri pe mid si retake-uri rapide. In Respawn, Inferno ajuta la repetarea pozitiilor care apar si in jocul clasic.",
        },
        {
          title: "aim_map / aim_headshot",
          copy:
            "Hartile de aim sunt utile pentru sesiuni scurte, dueluri directe si incalzire fara drumuri lungi intre spawn si contact.",
        },
        {
          title: "fy_snow / fy_pool_day",
          copy:
            "Hartile fun pot rupe monotonia si aduc energie comunitatii, dar trebuie folosite echilibrat ca serverul sa nu piarda identitatea de antrenament.",
        },
      ],
      rulesTitle: "Reguli scurte pentru ritm rapid",
      rulesIntro:
        "Respawn poate deveni haotic daca regulile nu sunt clare. Regulamentul trebuie sa protejeze fluxul jocului, jucatorii noi si calitatea duelurilor.",
      rules: [
        "Fara cheat-uri, scripturi, exploituri sau setari care ofera avantaj artificial.",
        "Fara camp excesiv in zone care blocheaza spawn-ul sau distrug fluxul serverului.",
        "Respecta jucatorii noi; Respawn este si pentru antrenament, nu doar pentru scor.",
        "Nu abuza de chat, voice sau spam. Ritmul rapid nu justifica toxicitatea.",
        "Raporteaza buguri, spawn-uri problematice sau comportamente abuzive pe canalele comunitatii.",
      ],
      communityTitle: "Comunitate pentru warm-up, progres si reveniri zilnice",
      communityBody: [
        "Respawn este serverul care poate tine comunitatea activa intre meciuri. Jucatorii intra pentru 10 minute de incalzire, raman pentru dueluri bune si revin daca simt ca serverul raspunde rapid, are staff prezent si nu ii obliga sa suporte haos inutil. De aceea pagina trebuie sa explice nu doar IP-ul, ci si filosofia modului.",
        "FREE-ARENA trateaza Respawn ca pe o zona de progres mecanic. Aici poti lucra la aim, recoil, viteza de reactie, schimbarea tintelor si increderea in duel. Pentru comunitate, serverul poate deveni locul unde se strang jucatorii inainte de mixuri, unde se testeaza harti si unde staff-ul vede rapid cine este activ.",
        "Discordul si TeamSpeak completeaza experienta pentru ca Respawn genereaza feedback imediat. O harta prea aglomerata, un spawn prost sau un comportament toxic se observa repede si trebuie raportat la fel de repede. Prin linkuri interne, pagina conecteaza jucatorii cu serverul Classic, CS2, hub-ul de servere si canalele de suport.",
        "Pentru SEO, Respawn are nevoie de limbaj diferit fata de Classic. Cautarea nu este doar despre Counter-Strike 1.6 Romania, ci despre warm-up, fraguri rapide, server respawn romanesc, antrenament aim si dueluri fara pauza. De aceea continutul explica exact de ce modul este util: repeti aceleasi situatii, inveti sa citesti spawn-uri, iti corectezi spray-ul si iti cresti viteza de reactie fara sa astepti finalul unei runde.",
        "Pentru jucatorii noi, pagina functioneaza ca o promisiune clara: poti intra rapid, poti invata ritmul, poti raporta probleme si poti trece usor catre Classic sau CS2 cand vrei o experienta mai tactica. Pentru jucatorii vechi, pagina arata ca serverul nu este doar un slot secundar, ci o parte importanta a ecosistemului FREE-ARENA, pregatita pentru statistici, evenimente scurte, provocari si comunitate activa.",
        "Un server Respawn bun are nevoie si de masurare. Harta, numarul de jucatori, ping-ul, raportarile si feedback-ul despre spawn-uri arata daca ritmul este sanatos. FREE-ARENA poate folosi aceste semnale pentru a regla rotatia, pentru a evita zonele abuzive si pentru a promova hartile care tin oamenii conectati mai mult timp. In felul acesta, pagina nu descrie doar ce exista acum, ci si cum poate creste serverul.",
      ],
      galleryTitle: "Screenshot gallery pentru Respawn",
      galleryIntro:
        "Galeria prezinta momentele cheie ale experientei Respawn: intrare rapida, dueluri constante si comunitate activa. Capturile reale din joc pot fi adaugate ulterior fara sa schimbam structura paginii.",
      gallery: [
        {
          title: "Respawn live",
          copy: "Preview pentru serverul rapid, dedicat duelurilor dese si warm-up-ului zilnic.",
          image: "/assets/game-icons/RES.png",
          alt: "Preview FREE-ARENA Respawn CS 1.6",
        },
        {
          title: "Aim si progres",
          copy: "Zona ideala pentru repetitie, control de spray si adaptare rapida la adversari.",
          image: "/assets/game-icons/CS.png",
          alt: "Preview aim FREE-ARENA Respawn",
        },
        {
          title: "Comunitate activa",
          copy: "Server conectat la Discord, TeamSpeak si restul ecosistemului FREE-ARENA.",
          image: "/assets/brand/free-arena-icons-preview.png",
          alt: "Preview comunitate Respawn FREE-ARENA",
        },
      ],
      internalLinksTitle: "Linkuri interne utile",
      internalLinks: [
        {
          title: "CS 1.6 Classic",
          copy: "Pentru runde clasice, economie, obiectiv si harti competitive.",
          href: "/server/cs16-classic",
        },
        {
          title: "CS2 FREE-ARENA",
          copy: "Pentru directia moderna Counter-Strike si viitoarele competitii.",
          href: "/server/cs2",
        },
        {
          title: "TeamSpeak FREE-ARENA",
          copy: "Pentru voice stabil, mixuri si coordonare rapida cu jucatorii.",
          href: "/teamspeak",
        },
      ],
    },
  },
  cs2: {
    ro: {
      eyebrow: "Landing page premium",
      title: "Server CS2 Romania pentru comunitate competitiva FREE-ARENA",
      intro:
        "FREE-ARENA CS2 este pagina construita pentru jucatorii romani care cauta Counter-Strike 2 cu identitate clara, suport, comunitate si perspectiva competitiva. Continutul acopera conectarea, beneficiile, hartile, regulile, comunitatea si directia serverului, astfel incat pagina sa poata concura pe cautari romanesti importante.",
      connect: {
        title: "Cum te conectezi pe serverul CS2",
        intro:
          "CS2 are un public mai nou, dar asteptarile sunt mai ridicate: informatii clare, conectare rapida, reguli curate si comunitate vizibila. Pagina trebuie sa fie suficient de explicita pentru jucatorii noi si suficient de serioasa pentru cei competitivi.",
        steps: [
          "Deschide Counter-Strike 2 din Steam si asigura-te ca jocul este actualizat.",
          "Foloseste consola sau browserul de servere pentru adresa 135.125.208.88:27015.",
          "Adauga serverul la favorite pentru revenire rapida dupa restart sau update.",
          "Verifica Discordul FREE-ARENA pentru anunturi, status si eventuale seri de test.",
          "Foloseste TeamSpeak cand intri cu prieteni sau cand vrei coordonare mai buna in meci.",
        ],
        note:
          "Daca CS2 are update-uri recente, unele servere pot aparea temporar intarziat in browser. IP-ul direct ramane cel mai sigur mod de conectare.",
      },
      featureTitle: "De ce CS2 are nevoie de o pagina puternica",
      features: [
        {
          title: "Intentie moderna",
          copy:
            "Jucatorii cauta server CS2 Romania, Counter-Strike 2 community server, server competitiv romanesc sau loc unde pot juca cu oameni reali. Pagina raspunde acestor cautari printr-o structura clara si continut dedicat.",
        },
        {
          title: "Legatura cu CS 1.6",
          copy:
            "FREE-ARENA nu porneste de la zero. Comunitatea are radacini in CS 1.6, Respawn, voice si forum. CS2 devine extensia moderna a acelui ecosistem, cu o pagina care explica de ce jucatorii vechi si noi se pot intalni aici.",
        },
        {
          title: "Competitiv fara bariera",
          copy:
            "Serverul este pozitionat pentru jucatori competitivi, dar nu inchide usa celor care invata. Regulile, suportul si comunitatea trebuie sa creeze un mediu in care skill-ul conteaza, iar toxicitatea nu domina.",
        },
        {
          title: "Baza pentru evenimente",
          copy:
            "CS2 poate sustine seri tematice, leaderboard-uri, meciuri organizate si continut video. Aceasta pagina creeaza fundatia SEO si informationala pentru toate aceste extensii viitoare.",
        },
      ],
      vipTitle: "Beneficii VIP in ecosistemul CS2",
      vipIntro:
        "Pentru CS2, VIP-ul trebuie gandit ca parte din identitate si sustinere, nu ca avantaj agresiv. Comunitatea creste cand jucatorii simt ca pot contribui la server si pot primi recunoastere fara sa strice echilibrul competitiv.",
      vipBenefits: [
        {
          title: "Recunoastere pe server",
          copy:
            "VIP-ul poate marca jucatorii activi si sustinatorii comunitatii prin tag, prezenta vizibila si acces la anunturi sau testari. Aceasta recunoastere ajuta comunitatea sa identifice oamenii implicati.",
        },
        {
          title: "Acces la teste si feedback",
          copy:
            "CS2 evolueaza prin update-uri dese. Jucatorii implicati pot ajuta la testarea setarilor, hartilor, pluginurilor si formatelor de evenimente inainte sa fie promovate catre toata comunitatea.",
        },
        {
          title: "Sustinere pentru infrastructura",
          copy:
            "Un server modern are nevoie de hosting stabil, monitorizare, admini si timp de configurare. Beneficiile VIP pot sustine aceasta infrastructura in timp ce experienta de baza ramane accesibila.",
        },
      ],
      mapsTitle: "Harti CS2 pentru rotatie competitiva",
      mapsIntro:
        "CS2 are nevoie de harti care sustin comunicarea, utilitatea si deciziile rapide. Rotatia trebuie sa fie familiara, dar suficient de moderna pentru jucatorii care urmaresc scena competitiva.",
      maps: [
        {
          title: "Mirage",
          copy:
            "Mirage ramane o harta de baza pentru jucatori romani: mid control, execute-uri simple, retake-uri si dueluri usor de inteles pentru echipe mixte.",
        },
        {
          title: "Inferno",
          copy:
            "Inferno testeaza comunicarea, utility-ul si rabdarea. Este potrivita pentru servere care vor sa incurajeze jocul de echipa, nu doar fragurile individuale.",
        },
        {
          title: "Nuke",
          copy:
            "Nuke aduce verticalitate, rotatii rapide si decizii complexe. Este buna pentru jucatorii care vor sa treaca dincolo de stilul pug simplu.",
        },
        {
          title: "Ancient / Anubis",
          copy:
            "Hartile mai noi dau serverului un aer modern si pregatesc comunitatea pentru meta-ul actual al CS2, cu pozitii si utilitate care trebuie invatate activ.",
        },
      ],
      rulesTitle: "Reguli pentru CS2 competitiv si curat",
      rulesIntro:
        "CS2 are nevoie de reguli clare pentru comportament, fair-play si calitatea meciurilor. O pagina puternica le spune jucatorilor la ce sa se astepte inainte sa intre.",
      rules: [
        "Fara cheat-uri, exploituri, abuz de buguri sau software care modifica avantajul competitiv.",
        "Respecta comunicarea echipei si evita toxicitatea constanta pe chat sau voice.",
        "Nu sabota rundele, nu bloca intentionat coechipierii si nu strica economia echipei fara motiv.",
        "Raporteaza problemele cu dovezi clare si foloseste canalele oficiale FREE-ARENA.",
        "Accepta deciziile staff-ului si foloseste forumul sau Discordul pentru contestatii civilizate.",
      ],
      communityTitle: "CS2 ca urmatorul pas FREE-ARENA",
      communityBody: [
        "FREE-ARENA CS2 este mai mult decat o pagina pentru un IP. Este locul unde comunitatea clasica poate face trecerea catre Counter-Strike modern fara sa piarda sentimentul de grup. Multi jucatori romani vin din CS 1.6, Respawn sau mixuri pe TeamSpeak; CS2 trebuie sa le ofere o destinatie clara, cu reguli si suport.",
        "O comunitate CS2 are nevoie de feedback constant. Update-urile jocului schimba grenade, harti, performanta si comportament. De aceea Discordul este important pentru anunturi rapide, iar TeamSpeak ramane util pentru echipe care vor voice stabil si coordonare in timp real. Pagina conecteaza aceste canale direct, ca jucatorii sa nu ramana izolati.",
        "Pe termen lung, CS2 poate deveni baza pentru competitii FREE-ARENA, leaderboard-uri, continut video si seri organizate. Continutul de aici este scris pentru cautari SEO, dar si pentru incredere: jucatorul trebuie sa vada ca serverul are o directie si ca poate deveni parte dintr-un ecosistem romanesc activ.",
        "Pentru cautarile romanesti, pagina CS2 trebuie sa explice si diferenta fata de serverele vechi. Jucatorii vor stabilitate, tick si performanta bune, reguli clare, harti actuale, staff care intelege jocul modern si canale prin care pot semnala rapid problemele. Continutul de aici pozitioneaza FREE-ARENA ca o comunitate care nu doar lanseaza un server, ci construieste o destinatie pentru Counter-Strike 2 in Romania.",
        "CS2 este si puntea catre generatia noua de continut: highlight-uri, screenshots reale, clipuri de event, ghiduri de harti, sesiuni de test si competitie organizata. Prin linkurile interne catre CS 1.6 Classic, Respawn, Discord si TeamSpeak, pagina ajuta Google sa inteleaga ecosistemul, iar jucatorii sa inteleaga traseul natural: se incalzesc pe Respawn, joaca rundele clasice in comunitate si intra pe CS2 pentru directia moderna.",
        "Pe partea competitiva, CS2 are nevoie de incredere. Jucatorii observa repede daca un server este neglijat, daca regulile nu sunt aplicate sau daca suportul lipseste. Pagina raspunde acestor temeri prin continut concret: conectare, harti, VIP controlat, reguli, comunitate si plan pentru evenimente. Aceste elemente construiesc autoritate atat pentru jucatori, cat si pentru indexarea Google.",
        "In plus, pagina poate deveni baza pentru ghiduri viitoare: smoke-uri pe Mirage, pozitii pe Inferno, rotatii pe Nuke, setari recomandate si recapitularea eventurilor. Aceasta extensibilitate conteaza pentru SEO, pentru ca un landing page puternic nu ramane static; el devine centrul in care se aduna continutul relevant despre server si comunitatea CS2 FREE-ARENA.",
      ],
      galleryTitle: "Screenshot gallery pentru CS2",
      galleryIntro:
        "Galeria prezinta directia vizuala si operationala a serverului CS2. Cand apar capturi reale din evenimente, highlight-uri sau meciuri, acestea pot fi introduse aici fara sa schimbam arhitectura paginii.",
      gallery: [
        {
          title: "CS2 server preview",
          copy: "Identitate moderna pentru serverul Counter-Strike 2 din ecosistemul FREE-ARENA.",
          image: "/assets/game-icons/CS2.png",
          alt: "Preview FREE-ARENA CS2 Romania",
        },
        {
          title: "Competitive hub",
          copy: "Spatiu pregatit pentru ranking, seri competitive si progres vizibil al comunitatii.",
          image: "/assets/game-icons/F.png",
          alt: "Preview hub competitiv FREE-ARENA CS2",
        },
        {
          title: "Community stack",
          copy: "Discord, TeamSpeak si forum conectate la aceeasi experienta pentru suport si organizare.",
          image: "/assets/brand/free-arena-icons-preview.png",
          alt: "Preview comunitate FREE-ARENA CS2",
        },
      ],
      internalLinksTitle: "Linkuri interne utile",
      internalLinks: [
        {
          title: "CS 1.6 Classic",
          copy: "Pentru jucatorii care vor radacina clasica a comunitatii FREE-ARENA.",
          href: "/server/cs16-classic",
        },
        {
          title: "Respawn CS 1.6",
          copy: "Pentru warm-up rapid, aim si dueluri dese inainte de CS2.",
          href: "/server/respawn",
        },
        {
          title: "Discord FREE-ARENA",
          copy: "Pentru anunturi, suport, feedback si organizarea comunitatii.",
          href: "/discord",
        },
      ],
    },
  },
  global: {
    ro: {
      eyebrow: "Proiect strategic",
      title: "FREE-ARENA Global pentru comunitate, evenimente si servere conectate",
      intro:
        "FREE-ARENA Global este pagina care pregateste etapa urmatoare a comunitatii: un punct central pentru jucatori, servere active, evenimente, rankings si anunturi importante. Pentru ca proiectul este inca in pregatire, continutul este scris transparent: explica directia, nu inventeaza status live sau date care nu exista inca.",
      connect: {
        title: "Cum urmaresti lansarea Global",
        intro:
          "Global nu este prezentat ca server activ daca nu este deschis. In schimb, pagina directioneaza jucatorii catre canalele reale unde se construieste comunitatea si unde vor aparea anunturile de lansare.",
        steps: [
          "Salveaza pagina Global ca reper pentru update-uri despre extinderea FREE-ARENA.",
          "Intra pe Discord pentru anunturi, feedback, poll-uri si discutii despre directia proiectului.",
          "Foloseste TeamSpeak pentru voice rapid cu jucatorii activi de pe serverele existente.",
          "Joaca pe CS 1.6 Classic, Respawn sau CS2 ca sa ramai conectat la nucleul comunitatii.",
          "Urmareste pagina de rankings pentru activitate, progres si semnale despre jucatorii constanti.",
        ],
        note:
          "Cand Global va primi o directie finala, aceasta pagina poate fi actualizata fara schimbarea URL-ului. Asta pastreaza autoritatea SEO acumulata si evita fragmentarea semnalelor pentru Google.",
      },
      featureTitle: "Ce rol are Global in ecosistemul FREE-ARENA",
      features: [
        {
          title: "Hub central",
          copy:
            "Global poate lega serverele existente intr-un traseu comun: CS 1.6 Classic pentru experienta clasica, Respawn pentru actiune rapida, CS2 pentru directia moderna si rankings pentru activitate masurabila. Pagina explica aceasta structura intr-un mod usor de inteles.",
        },
        {
          title: "Evenimente viitoare",
          copy:
            "O comunitate creste cand are motive sa revina. Global este locul potrivit pentru seri tematice, provocari, competitii, anunturi si update-uri care nu apartin unui singur server, dar ajuta intregul proiect FREE-ARENA.",
        },
        {
          title: "SEO fara date false",
          copy:
            "Pagina evita promisiunile artificiale. Nu pretinde ca serverul este live daca este coming soon, nu afiseaza harti inexistente si nu inventeaza jucatori. In schimb, ofera context real despre comunitate, plan si legaturi interne.",
        },
        {
          title: "Crestere pe termen lung",
          copy:
            "URL-ul stabil permite acumularea autoritatii in timp. Pe masura ce apar evenimente, capturi, ghiduri sau sisteme noi, Global poate deveni centrul de comunicare pentru extinderea FREE-ARENA.",
        },
      ],
      vipTitle: "Beneficii pentru membrii activi",
      vipIntro:
        "Global poate introduce beneficii pentru jucatorii care sustin comunitatea, dar acestea trebuie comunicate corect: ca recunoastere si acces la experiente, nu ca avantaj care strica echilibrul serverelor.",
      vipBenefits: [
        {
          title: "Rol vizibil in comunitate",
          copy:
            "Jucatorii activi pot primi roluri, taguri sau recunoastere in Discord, rankings si evenimente. Aceasta identitate ii ajuta pe oameni sa se regaseasca mai usor in comunitate.",
        },
        {
          title: "Acces la testari",
          copy:
            "Membrii implicati pot participa la testarea directiilor noi: moduri, reguli, evenimente, sisteme de progres sau formate de competitie. Feedback-ul real este mai valoros decat lansarile facute in gol.",
        },
        {
          title: "Prioritate la anunturi",
          copy:
            "Cand se pregatesc schimbari importante, comunitatea activa trebuie sa afle prima. Global poate deveni locul unde aceste anunturi sunt centralizate si legate de serverele existente.",
        },
        {
          title: "Sustinere fara pay-to-win",
          copy:
            "Beneficiile trebuie sa sustina proiectul fara sa transforme serverele in experiente dezechilibrate. FREE-ARENA poate pastra regulile clare si avantajele controlate.",
        },
      ],
      mapsTitle: "Directii posibile pentru lansarea Global",
      mapsIntro:
        "Pentru un proiect coming soon, sectiunea de harti devine un roadmap operational: ce zone pot fi dezvoltate si cum se conecteaza ele cu serverele active.",
      maps: [
        {
          title: "Cross-server events",
          copy:
            "Evenimente care pornesc de pe CS 1.6, Respawn sau CS2 si sunt anuntate centralizat prin Global, cu reguli si premii clare.",
        },
        {
          title: "Community hub",
          copy:
            "O pagina care trimite jucatorii spre Discord, TeamSpeak, rankings si serverele potrivite fara sa ii piarda in meniuri sau rute vechi.",
        },
        {
          title: "Competitive calendar",
          copy:
            "Calendar pentru seri organizate, provocari, mini-turnee si update-uri relevante pentru jucatorii care revin constant.",
        },
        {
          title: "Content center",
          copy:
            "Zona pentru screenshot-uri, recapitularea eventurilor, ghiduri si materiale care pot creste autoritatea brandului FREE-ARENA.",
        },
      ],
      rulesTitle: "Reguli de baza pentru proiectul Global",
      rulesIntro:
        "Chiar daca Global este in pregatire, pagina trebuie sa seteze asteptari corecte pentru comportament, comunicare si modul in care comunitatea contribuie.",
      rules: [
        "Nu sunt publicate date false despre status, jucatori, harti sau lansare.",
        "Feedback-ul pentru Global trebuie trimis pe canalele oficiale, cu propuneri clare si utile.",
        "Evenimentele viitoare trebuie sa pastreze fair-play-ul si regulile serverelor active.",
        "Discord si TeamSpeak raman canalele principale pentru organizare, suport si anunturi.",
        "Global nu inlocuieste serverele existente; le conecteaza si le sustine.",
      ],
      communityTitle: "Comunitatea care sustine Global",
      communityBody: [
        "FREE-ARENA Global are sens doar daca pleaca din activitatea reala a jucatorilor. Serverele existente sunt deja punctele de intrare: unii vin pentru CS 1.6 Classic, altii pentru Respawn, iar o parte urmaresc directia CS2. Global aduna aceste drumuri intr-o poveste comuna.",
        "Pentru SEO, pagina ajuta Google sa inteleaga ca FREE-ARENA nu este o lista izolata de servere, ci un ecosistem cu server hub, landing page-uri dedicate, clasamente, voice si comunitate. Linkurile interne sunt esentiale pentru aceasta structura.",
        "Pentru jucatori, Global trebuie sa fie simplu: daca vrei sa afli ce urmeaza, intri aici; daca vrei sa joci acum, mergi spre serverele active; daca vrei suport sau discutii, intri pe Discord sau TeamSpeak. Aceasta claritate reduce confuzia si creste increderea.",
        "Cand proiectul va fi gata pentru lansare, pagina poate primi screenshot-uri reale, un calendar de evenimente, recapitularea competitiilor si continut nou fara sa schimbe fundatia tehnica. Asta face Global util inainte si dupa lansare.",
      ],
      galleryTitle: "Screenshot gallery pentru Global",
      galleryIntro:
        "Pana la capturi reale din evenimente, galeria foloseste asset-uri de brand si preview-uri care arata directia proiectului fara sa pretinda ca exista gameplay live.",
      gallery: [
        {
          title: "Global hub preview",
          copy: "Identitate centrala pentru evenimente, servere conectate si comunitatea FREE-ARENA.",
          image: "/assets/game-icons/F.png",
          alt: "Preview FREE-ARENA Global hub",
        },
        {
          title: "Server ecosystem",
          copy: "CS 1.6 Classic, Respawn si CS2 pot trimite autoritate si activitate catre Global.",
          image: "/assets/brand/free-arena-icons-preview.png",
          alt: "Preview ecosistem servere FREE-ARENA",
        },
        {
          title: "Community signals",
          copy: "Discord, TeamSpeak si rankings formeaza baza pentru lansari si anunturi viitoare.",
          image: "/assets/game-icons/CS.png",
          alt: "Preview comunitate FREE-ARENA Global",
        },
      ],
      internalLinksTitle: "Linkuri interne pentru Global",
      internalLinks: [
        {
          title: "Servere FREE-ARENA",
          copy: "Hubul principal pentru status live, IP-uri, moduri active si traseul catre fiecare server.",
          href: "/servers",
        },
        {
          title: "CS 1.6 Classic",
          copy: "Serverul clasic care formeaza baza comunitatii romanesti FREE-ARENA.",
          href: "/server/cs16-classic",
        },
        {
          title: "Respawn",
          copy: "Modul pentru warm-up, actiune rapida si jucatori care vor dueluri dese.",
          href: "/server/respawn",
        },
        {
          title: "CS2",
          copy: "Directia moderna pentru competitii, update-uri si cresterea ecosistemului.",
          href: "/server/cs2",
        },
        {
          title: "Rankings",
          copy: "Clasamentul care arata activitatea si progresul jucatorilor FREE-ARENA.",
          href: "/rankings",
        },
        {
          title: "Discord",
          copy: "Canalul principal pentru anunturi, feedback, suport si comunitate.",
          href: "/discord",
        },
      ],
    },
    en: {
      eyebrow: "Strategic project",
      title: "FREE-ARENA Global for community, events and connected servers",
      intro:
        "FREE-ARENA Global prepares the next stage of the community: a central point for players, active servers, events, rankings and important updates. Because the project is still in preparation, the content stays transparent: it explains direction without inventing live status or data that does not exist yet.",
      connect: {
        title: "How to follow the Global launch",
        intro:
          "Global is not presented as an active server while it is not open. Instead, this page sends players to the real channels where the community is being built and where launch updates will appear.",
        steps: [
          "Save the Global page as the stable reference for FREE-ARENA expansion updates.",
          "Join Discord for announcements, feedback, polls and discussions about the project direction.",
          "Use TeamSpeak for fast voice with active players from the existing servers.",
          "Play CS 1.6 Classic, Respawn or CS2 to stay connected to the community core.",
          "Follow the rankings page for activity, progress and signals from consistent players.",
        ],
        note:
          "When Global gets its final direction, this page can be updated without changing the URL. That preserves accumulated SEO authority and avoids fragmented Google signals.",
      },
      featureTitle: "What Global does in the FREE-ARENA ecosystem",
      features: [
        {
          title: "Central hub",
          copy:
            "Global can connect the existing servers into one path: CS 1.6 Classic for the classic experience, Respawn for fast action, CS2 for the modern direction and rankings for measurable activity.",
        },
        {
          title: "Future events",
          copy:
            "A community grows when players have reasons to return. Global is the right place for themed nights, challenges, competitions, announcements and updates that support the whole FREE-ARENA project.",
        },
        {
          title: "SEO without fake data",
          copy:
            "The page avoids artificial promises. It does not claim the server is live while it is coming soon, does not show invented maps and does not fabricate player data.",
        },
        {
          title: "Long-term growth",
          copy:
            "A stable URL allows authority to compound over time. As events, screenshots, guides and new systems appear, Global can become the communication center for FREE-ARENA expansion.",
        },
      ],
      vipTitle: "Benefits for active members",
      vipIntro:
        "Global can introduce benefits for players who support the community, but they should be framed as recognition and access to experiences, not as advantages that damage server balance.",
      vipBenefits: [
        {
          title: "Visible community role",
          copy:
            "Active players can receive roles, tags or recognition in Discord, rankings and events. That identity helps people find their place in the community.",
        },
        {
          title: "Access to tests",
          copy:
            "Involved members can help test new directions: modes, rules, events, progression systems or competitive formats. Real feedback is more valuable than launching in isolation.",
        },
        {
          title: "Priority updates",
          copy:
            "When important changes are planned, the active community should hear first. Global can centralize those updates and connect them to the existing servers.",
        },
        {
          title: "Support without pay-to-win",
          copy:
            "Benefits should support the project without turning servers into unbalanced experiences. FREE-ARENA can keep clear rules and controlled advantages.",
        },
      ],
      mapsTitle: "Possible directions for the Global launch",
      mapsIntro:
        "For a coming soon project, the map section becomes an operational roadmap: what can be developed and how it connects to the active servers.",
      maps: [
        {
          title: "Cross-server events",
          copy:
            "Events that start from CS 1.6, Respawn or CS2 and are announced centrally through Global with clear rules and rewards.",
        },
        {
          title: "Community hub",
          copy:
            "A page that sends players to Discord, TeamSpeak, rankings and the right servers without losing them in menus or old routes.",
        },
        {
          title: "Competitive calendar",
          copy:
            "A calendar for organized nights, challenges, mini-tournaments and relevant updates for returning players.",
        },
        {
          title: "Content center",
          copy:
            "A place for screenshots, event recaps, guides and assets that can increase FREE-ARENA brand authority.",
        },
      ],
      rulesTitle: "Basic rules for the Global project",
      rulesIntro:
        "Even while Global is in preparation, the page should set correct expectations for behavior, communication and community contribution.",
      rules: [
        "No false data about status, players, maps or launch timing should be published.",
        "Feedback for Global should go through official channels with clear and useful proposals.",
        "Future events should preserve fair play and the rules of active servers.",
        "Discord and TeamSpeak remain the main channels for organization, support and announcements.",
        "Global does not replace existing servers; it connects and supports them.",
      ],
      communityTitle: "The community behind Global",
      communityBody: [
        "FREE-ARENA Global only matters if it starts from real player activity. The existing servers are already the entry points: some players come for CS 1.6 Classic, others for Respawn, while part of the community follows the CS2 direction.",
        "For SEO, the page helps Google understand that FREE-ARENA is not an isolated server list, but an ecosystem with a server hub, dedicated landing pages, rankings, voice and community channels.",
        "For players, Global should be simple: if you want to know what comes next, start here; if you want to play now, move to the active servers; if you need support or discussion, join Discord or TeamSpeak.",
        "When the project is ready for launch, the page can receive real screenshots, an event calendar, competition recaps and new content without changing the technical foundation.",
      ],
      galleryTitle: "Screenshot gallery for Global",
      galleryIntro:
        "Until real event screenshots exist, the gallery uses brand assets and previews that show project direction without pretending live gameplay exists.",
      gallery: [
        {
          title: "Global hub preview",
          copy: "A central identity for events, connected servers and the FREE-ARENA community.",
          image: "/assets/game-icons/F.png",
          alt: "FREE-ARENA Global hub preview",
        },
        {
          title: "Server ecosystem",
          copy: "CS 1.6 Classic, Respawn and CS2 can pass authority and activity to Global.",
          image: "/assets/brand/free-arena-icons-preview.png",
          alt: "FREE-ARENA server ecosystem preview",
        },
        {
          title: "Community signals",
          copy: "Discord, TeamSpeak and rankings form the base for future launches and announcements.",
          image: "/assets/game-icons/CS.png",
          alt: "FREE-ARENA Global community preview",
        },
      ],
      internalLinksTitle: "Useful Global internal links",
      internalLinks: [
        {
          title: "FREE-ARENA Servers",
          copy: "The main hub for live status, IPs, active modes and routes to each server.",
          href: "/servers",
        },
        {
          title: "CS 1.6 Classic",
          copy: "The classic server that forms the base of the FREE-ARENA community.",
          href: "/server/cs16-classic",
        },
        {
          title: "Respawn",
          copy: "The mode for warm-up, fast action and players who want frequent duels.",
          href: "/server/respawn",
        },
        {
          title: "CS2",
          copy: "The modern direction for competition, updates and ecosystem growth.",
          href: "/server/cs2",
        },
        {
          title: "Rankings",
          copy: "The leaderboard that shows FREE-ARENA player activity and progress.",
          href: "/rankings",
        },
        {
          title: "Discord",
          copy: "The main channel for announcements, feedback, support and community activity.",
          href: "/discord",
        },
      ],
    },
  },
};
