var PI = 3.14159265359;

var tree = [];
var leaves = [];

var count = 0;
var leafSlider;
var branchRatioSlider;
var angleSlider;
var leafVal;
var branchVal;
var angleVal;
var changed;

var newTreeButton;

function setup() {
  createCanvas(600, 600);

  changed = false;

  createDiv('');
  newTreeButton = createButton('Generate New Tree');
  createP('Tree size : ');
  leafSlider = createSlider(1, 10, 7, 1);
  createP('Branch ratio : ');
  branchRatioSlider = createSlider(0.5, 0.8, 0.7, 0.01);
  createP('Branch angle : ');
  angleSlider = createSlider(PI / 18, PI / 4.5, PI / 5.5, 0.01);

  newTreeButton.mousePressed(function() {
    changed = true
  });

}

function generateTree() {
  leaves = [];
  tree = [];
  var a = createVector(width / 2, height);
  var b = createVector(width / 2, height - 100);
  var root = new Branch(a, b, 1);
  tree[0] = root;

  var leavesThreshold = leafSlider.value();
  for (var n = 0; n < leavesThreshold; n++) {
    if (n === leavesThreshold - 1) {
      for (var i = 0; i < tree.length; i++) {
        if (!tree[i].finished) {
          var leaf = tree[i].end.copy();
          leaves.push(leaf);
        }
      }
    } else {
      for (var i = tree.length - 1; i >= 0; i--) {
        if (!tree[i].finished) {
          if (n > leavesThreshold/2 && random() < 0.3) {
            var leaf = tree[i].end.copy();
            leaves.push(leaf);
          } else {
            tree.push(tree[i].branchA());
            tree.push(tree[i].branchB());
          }
        }
        tree[i].finished = true;
      }
    }
  }
}

function draw() {

  if (changed) {
    generateTree();
  }

  if (leafVal != leafSlider.value() ||
    angleVal != angleSlider.value() ||
    branchVal != branchRatioSlider.value()) {
    leafVal = leafSlider.value();
    angleVal = angleSlider.value();
    branchVal = branchRatioSlider.value();
    changed = true;
  } else {
    changed = false;
  }

  background(200);

  for (var i = 0; i < tree.length; i++) {
    tree[i].show();
  }

  for (var i = 0; i < leaves.length; i++) {
    fill(0, 200, 0, 100);
    noStroke();
    ellipse(leaves[i].x, leaves[i].y, 8, 8);
  }

}
