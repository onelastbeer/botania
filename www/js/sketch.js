var PI = 3.14159265359;

var tree = [];
var leaves = [];

var count = 0;
var leafSlider;
var brancheRatioSlider;
var angleSlider;

function setup() {
  createCanvas(600, 600);

  leafSlider = createSlider(1, 10, 7, 1);
  brancheRatioSlider = createSlider(0.5,0.8,0.7,0.01);
  angleSlider = createSlider(PI/18,PI/4.5,PI/5.5,0.01);

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
          tree.push(tree[i].branchA());
          tree.push(tree[i].branchB());
        }
        tree[i].finished = true;
      }
    }
  }
}

function draw() {
  background(200);
  generateTree();

  for (var i = 0; i < tree.length; i++) {
    tree[i].show();
  }

  for (var i = 0; i < leaves.length; i++) {
    fill(0, 200, 0, 100);
    noStroke();
    ellipse(leaves[i].x, leaves[i].y, 8, 8);
  }

}
