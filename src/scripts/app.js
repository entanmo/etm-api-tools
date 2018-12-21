"use strict";

const Application = require("./src/application");

const app = new Application();
void(app);

// 统计账号信息
// app.run()
//     .then(result => {
//         //console.log(`app finish with ${result} addresses`);
//     })
//     .catch(err => {
//         //console.log("app run error:", err);
//     });

// 生成账号
// let accountFile = './output/account.json';
// app.createAccounts(127, accountFile);

// 读取账号
let accountFile = './output/account.json';
let accounts = app.readInFile(accountFile);

// 批量转账
// //console.log(typeof accounts)
// let data = [];
// let s0 = "finish dragon select tiger wash law trial aunt bitter spring fatigue jacket";
// for (let i = 0; i < accounts.secrets.length; i++) {
//   data.push({
//     sender: s0,
//     recipient: accounts.address[i],
//     amount: 100
//   })
// }
// //console.log(data)

// app.batchTransfer(data
//     // [{
//     //   sender: "race forget pause shoe trick first abuse insane hope budget river enough",
//     //   recipient: "A9UgMsDcVLswLYoFfEhMKyfxaD6DS1KsCj",
//     //   amount: 123
//     // }]
//   )
//   .then(res => {
//     void(res);
//     //console.log("Finish");
//   })
//   .then(err => {
//     //console.log(err);
//   })



// 批量注册了代理人(矿工)
// app.batchRegDelegates([{
//             secret: "zebra hire stairs curious mad any odor maple medal scale scene giraffe",
//             username: "hello_etm"
//         }
//     ])
//     .then(result => {
//         void(result);
//         //console.log("Finish");
//     })
//     .catch(err => {
//         //console.log(err);
//     });



// 批量锁仓
// let data = [];
// for (let i = 0; i < accounts.secrets.length; i++) {
//   data.push({
//     secret: accounts.secrets[i],
//     lockamount: (99 * Math.pow(10, 8)).toString()
//   })
// }
// app.batchLockVotes(data
//     // [{
//     //   secret: "ethics deliver few unfair moment survey common input ethics blouse love master",
//     //   lockamount: (10 * Math.pow(10, 8)).toString()
//     // }]
//   )
//   .then(result => {
//     void(result);
//     //console.log("Finish");
//   })
//   .catch(error => {
//     //console.log("error:", error);
//   });



// 批量投票
let data = [];
let winnerSecrets = [
  "alone shallow wise army floor plastic grant inject ranch shop relax initial",
  "frog access armed plunge grain hole oppose unusual across analyst piece scout",
  "wreck endorse sunset sugar rotate supreme salmon teach already usual hand permit",
  "hello version derive flock tide jealous plunge fence punch spray victory clap",
  "ill warm sibling ring lock valid payment manual misery lunch program remain",
  "violin pitch prevent hint dove possible inform fabric fantasy close brother patient",
  "service friend chaos practice artefact around pear fish grant hood front toy",
  "isolate vibrant library more must trigger pencil position session loyal occur junior",
  "swallow snow arrive sponsor search again parent weasel element coral curious upon",
  "lucky seven glass child riot lemon increase replace melody skull speed call",
  "waste palace adjust finish vintage rival skull differ cotton doll budget dizzy",
  "entire shock neither adapt goat stairs mandate fitness cargo public song surround",
  "furnace ship ostrich scale usage ship ordinary couple issue talk youth rebel",
  "ladder can insect pet segment hotel scatter leaf repair punch cash coil",
  "slender exit ladder derive gown lesson box deposit abuse dove runway resist",
  "absent front people siege field shoe garment bridge robot wealth hope service",
  "resemble acoustic grace pen elevator firm forward salmon task lady axis kingdom",
  "onion deliver frown fragile depend trade volume lion onion behave twenty egg",
  "own post gentle mixture defy coffee jaguar anxiety wedding grace grape glory",
  "shy tower toward arrive butter frown left document black wire cable false",
  "candy program lift hand gallery scare ridge boss bullet lend vehicle obscure",
  "taste any oil sound stairs pony scissors regret tenant response under hole",
  "appear picture educate normal silly aisle moon gap board life forum student",
  "capital tent quick rival frown crazy excite reflect recycle champion future upgrade",
  "property fresh margin image maximum shop piece hurt dignity someone crucial picture",
  "reflect amused august high people neither silk picture art deny autumn october",
  "fitness puzzle slide april tail trial essence fiscal congress avocado trumpet extend",
  "vibrant prize sail trap anchor library mule aspect tooth captain nuclear ripple",
  "friend next cereal tissue tenant smooth van scale finger journey blur sight",
  "rebuild day cement cream anger library allow address surround harsh hard clutch",
  "intact glow struggle direct index scale gentle label sunny whip regret earth",
  "gossip document dragon jeans desk pudding shrug fashion powder refuse clip basic",
  "drastic accuse coin tragic science title glass edge urge prosper play olympic",
  "silent bid clump fame amused heart banana sentence rebel cinnamon afford twist",
  "festival hobby vote machine jaguar absent category board race depend alarm uncover",
  "relief spell crowd maximum cliff oak swift cherry concert room blue meadow",
  "crawl rabbit obey upgrade glove brain base add captain grid deliver essay",
  "domain infant mixed slim hotel merge burst aerobic finger summer mad spice",
  "rack furnace cliff sea kid match hint clock spike vault alter degree",
  "rough stem cloud alarm resist jaguar oil firm bag tiny legend dismiss",
  "coin coyote snack day axis bomb bird seek inquiry adult defense about",
  "boil unknown skirt jump insane age barrel obey mechanic trick surprise twice",
  "crumble apology confirm case coffee acquire build always jealous toast system enjoy",
  "sentence corn equip rocket velvet service human teach slender holiday undo adapt",
  "fun worth include cradle wash height annual praise purchase digital card always",
  "soul throw paddle devote ecology valve chase word heart grief salon guide",
  "foil neglect cup carpet flavor leg eternal neither trouble wear resemble wrong",
  "inner magic when lizard marble suit have design garage vessel room link",
  "manage bone shaft miracle grocery solve company check act naive zone cover",
  "giant never flush garden response gesture same grab gorilla scorpion world note",
  "expect torch problem chunk neutral horn drastic flight giant swing kind cattle",
  "type cluster blind zebra rival kiss artist mimic curtain curious voyage disagree",
  "thought cheese deal source sick cigar novel borrow under sunny social already",
  "often plunge direct sphere jelly pond swarm drink diagram glue avoid cousin",
  "tomato arrest output symbol oyster faith anchor leader mercy drink deal vanish",
  "punch token pen era cheap crane fix banner antenna people silver wheel",
  "glow bracket satoshi weekend stairs motion sting patch organ hospital atom gorilla",
  "bind wild number game soldier matrix employ margin march course sign electric",
  "battle evolve acquire pizza muscle believe motor false hidden swear asset box",
  "panther attract loud coil end napkin warfare vehicle excite celery purity rather",
  "mad vibrant silly praise divorce share cloud entry van keen scissors sentence",
  "weasel short kit february fork pencil welcome detect cherry such piece actor",
  "over defy pledge destroy suit present negative prize target federal cave write",
  "gas wife super one spike brave worry pencil giggle ship atom mask",
  "visual cover chapter height fee adjust vague burger dwarf resist calm jealous",
  "can soda drink magnet hundred siege gauge future ship educate team theory",
  "require broccoli divert click ridge visual rent toilet wood napkin jar era",
  "category category series avocado drama pool beyond punch strong wish device merge",
  "rule embody elite merit fabric vault cigar boil place around van load",
  "genuine blossom jar waste plate bargain limb cup seek day health police",
  "shoe amateur wrist spell planet promote winter tag wonder come topple mansion",
  "around hire dream learn chef industry vapor yellow innocent file radar rule",
  "quarter perfect muscle seed need original stable merge tuition prefer speed nose",
  "wrestle magnet party erosion rough weather economy grace security loan device harvest",
  "wheat thunder domain nerve change sport diesel welcome split invest office flee",
  "diagram puppy brother library resemble eye wrap expose material fat dragon orphan",
  "rent keep profit day jelly disagree time stem perfect embrace copper used",
  "ice track over pole secret drink obscure quit word script budget penalty",
  "hope improve emotion style wife enable swallow daring equip theory reopen real",
  "gloom develop siege else voyage visa left conduct ball pipe winter theme",
  "quote giant lucky raccoon crater rally mechanic sphere merry picnic tuition decline",
  "goose fabric expand outside fog ridge copy scrap grass grant crunch cradle",
  "rebuild cup joke choose endless brush possible rabbit giggle alter vessel busy",
  "mass material point month put chair hurry urge swim fit apology chat",
  "violin fortune bracket scrub where own response enlist recall certain mechanic dog",
  "cost predict recycle pave entry resist danger priority aunt pride arrange kite",
  "rocket width decrease clever inform adjust over install voice dumb pattern legend",
  "permit retire forum act wave provide gown marriage tank clip uphold false",
  "debate loud ahead sick actress horror boy fun model main series escape",
  "onion ecology void force video amused enemy maid flat civil earth initial",
  "wish scan grab blood dial episode peasant lottery expect panel donate fade",
  "monkey bunker lumber index meat shrimp favorite average permit card wing ostrich",
  "rabbit art frame avocado stereo immune skill alter neglect share valid robust",
  "truth kiss cloth true knee brave rocket chaos uphold fluid harsh material",
  "era network draw wet desert hockey fashion satoshi desk gather cross fetch",
  "infant spirit congress during prevent imitate object twenty sport drama improve unknown",
  "audit casino deliver column yellow ring thunder surprise evidence shell engine alter",
  "jealous spot pioneer biology easy blush iron audit potato goat vintage network",
  "monster affair use fabric penalty chunk keen soldier stick wool swing shove",
  "gym oxygen super major rather drama during return area subway suggest dizzy",
  "conduct rifle violin half luxury tornado wood squeeze topic sausage split strike",
  "aisle trophy derive unit glow scatter jelly truth feel host harsh topple",
  "puzzle behind stereo sing device miracle episode silent predict evidence name lawsuit",
  "accuse dance axis stone trumpet worth glass slow enforce moon brand gasp",
  "marble liar online galaxy tube jungle gas isolate someone swarm puppy code",
  "pink boss scissors better stable album proof material top mother hollow tomato",
  "possible shuffle example jungle element occur tonight claw empty mammal canyon turtle",
  "gift seed describe multiply cinnamon marine frequent forest loop sure valve smile",
  "flee kid juice sell enhance leader next impulse maximum unfair disease napkin",
  "chicken tribe proud matter gossip action produce december muscle gift analyst will",
  "width tobacco hint play park badge nuclear power normal neck begin bridge",
  "venture salon super swear blanket protect above reduce engine company loan bracket",
  "letter left tragic artwork produce faculty toss property grocery ball trip tuition",
  "mixed lecture butter tube music blue august harvest cute coyote shop museum",
  "use collect owner gorilla awkward utility light flock gap push obvious arm",
  "vague first vocal gain sausage destroy twin brick fortune pact cry jungle",
  "dignity ill beef bulb easily pair aware moment happy spend tool dad",
  "exist submit pool relax echo museum lens claw two latin start ring",
  "boy such push picture extend cloth salt collect long size history moon",
  "extra enhance morning purchase over slot illness sadness paper observe arena flower",
  "name adult shell broken toward nominee safe clutch attitude cheap act boost",
  "output denial shoot vibrant west chase eye casual armor core candy put",
  "hand much february force case level fish luxury play clever monitor firm",
  "private half speak cluster furnace casino walnut gossip first save anxiety dwarf",
  "success salute federal dose air dry glimpse helmet garlic trip same above",
  "armor whale chronic mountain pretty food lizard nephew film judge belt black",
  "grape holiday motor hood loan discover nuclear garden minor swing final glad"
];
let winnerPublicKey = [];
for (let i = 0; i < accounts.secrets.length; i++) {
  winnerPublicKey.push(app.getPublicKey(winnerSecrets[i]))

  data.push({
    secret: accounts.secrets[i],
    additional: winnerPublicKey[i]
  })
}
// //console.log(data)
app.batchVote(data
    // [{
    //   secret: "ethics deliver few unfair moment survey common input ethics blouse love master",
    //   additional: "f645e8186c694f222088f066bac9e32aeb6b22411c6d74e8c654beb1535ecb1e",
    //   removal: undefined
    // }]
  )
  .then(result => {
    void(result);
    //console.log("Finish");
  })
  .catch(error => {
    //console.log("error:", error);
  });