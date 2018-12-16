var RANDOM_WORDS = [
  'abstrusity',
  'advertisable',
  'bellwood',
  'benzole',
  'boreum',
  'brenda',
  'cassiopeian',
  'chansonnier',
  'cleric',
  'conclusional',
  'conventicle',
  'copalm',
  'cornopion',
  'crossbar',
  'disputative',
  'djilas',
  'ebracteate',
  'ephemerally',
  'epidemical',
  'evasive',
  'eyeglasses',
  'farragut',
  'fenny',
  'ferryman',
  'fluently',
  'foreigner',
  'genseng',
  'glaiket',
  'haunch',
  'histogeny',
  'illocution',
  'imprescriptible',
  'inapproachable',
  'incisory',
  'intrusiveness',
  'isoceraunic',
  'japygid',
  'juiciest',
  'jump',
  'kananga',
  'leavening',
  'legerdemain',
  'licence',
  'licia',
  'luanda',
  'malaga',
  'mathewson',
  'nonhumus',
  'nonsailor',
  'nummary',
  'nyregyhza',
  'onanist',
  'opis',
  'orphrey',
  'paganising',
  'pebbling',
  'penchi',
  'photopia',
  'pinocle',
  'principally',
  'prosector.',
  'radiosensitive',
  'redbrick',
  'reexposure',
  'revived',
  'subexternal',
  'sukarnapura',
  'supersphenoid',
  'tabularizing',
  'territorialism',
  'tester',
  'thalassography',
  'tuberculise',
  'uncranked',
  'undersawyer',
  'unimpartible',
  'unsubdivided',
  'untwining',
  'unwaived',
  'webfoot',
  'wedeling',
  'wellingborough',
  'whiffet',
  'whipstall',
  'wot',
  'yonkersite',
  'zonary'
];

function getTreeDataCount(data) {
  return data.map(getExpandedItemCount).reduce((t, c) => t + c, 0);
}

function getExpandedItemCount(item) {
  var count = 1;

  count += item.children
    .map(getExpandedItemCount)
    .reduce(function(total, count) {
      return total + count;
    }, 0);

  return count;
}

function getGridCount(data) {
  return data.map(getExpandedItemCount).reduce((t, c) => t + c, 0);
}

function flattenData(data) {
  var result = [];
  data.forEach(c => {
    result = result.concat(flattenExpandedItem(c, 0));
  });

  return result;
}

function flattenExpandedItem({ name, children }, depth) {
  let result = [{ name, depth, expanded: true }];

  if (children.length) {
    children.forEach(c => {
      result = result.concat(flattenExpandedItem(c, depth + 1));
    });
  }

  return result;
}

function createRandomizedItem(depth) {
  var item = {};
  item.children = [];
  item.name = RANDOM_WORDS[Math.floor(Math.random() * RANDOM_WORDS.length)];

  var numChildren = depth <= 3 ? Math.floor(Math.random() * 10 * depth) : 0;
  for (var i = 0; i < numChildren; i++) {
    item.children.push(createRandomizedItem(depth + 1));
  }

  return item;
}

function createRandomizedData() {
  var data = [];

  for (var i = 0; i < 5; i++) {
    data.push(createRandomizedItem(1));
  }

  return data;
}

function flattenNode(n, d) {
  var result = [
    {
      name: n.name,
      depth: d
    }
  ];

  if (n.children.length !== 0) {
    result[0].expanded = true;
    n.children.forEach(function(c) {
      result = result.concat(flattenNode(c, d + 1));
    });
  }

  return result;
}

function flattenTreeData(data) {
  var result = [];
  data.forEach(function(n) {
    result = result.concat(flattenNode(n, 0));
  });
  return result;
}

/*
  This will create:
- level 0 - 20 nodes
- level 1 - random between 0 and 20 nodes
- level 2 - random between 0 and 40 nodes
- level 3 - random between 0 and 60 nodes

On average you'll get ~120k nodes
*/
var treeData = createRandomizedData();
var flattenData = flattenTreeData(treeData);
var dataCount = getTreeDataCount(treeData);

export { flattenData as gridData, dataCount as gridDataCount };
