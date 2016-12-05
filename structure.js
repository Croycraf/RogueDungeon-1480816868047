/*globals TILE_SIZE:true TILE_SPACE:true dungeonLevel:true gold:true ctx:true position:true pl tempHall:true mainHall sideHalls numHalls isVertical:true noEnd:true temp:true score:true combatActive:true shopActive:true awaitingInput:true gameOver:true diffScale:true enemies numEnemies:true abilitiesActive:true abilitySelected:true columnSelected:true abilityError:true displayNewPoint:true scoreboardActive serverConnection:true highScoresText:true*/
/*eslint-env browser, shelljs*/
function start() {
	TILE_SIZE = 40;
	TILE_SPACE = 50;
	serverConnection = 0;
	sentHighScores = 0;
	highScoresText = "generic text test";
	scoreOffset = 0;
	
	//general globals
	dungeonLevel = 1;
	gold = 0;
	score = 0;
	
	//hero ability globals
	abilitySelected = "null";
	columnSelected = "null";
	abilityError = "";
	displayNewPoint = 0;
	
	//game state globals
	combatActive = 0;
	shopActive = 0;
	abilitiesActive = 0;
	awaitingInput = 0;
	gameOver = 0;
	scoreboardActive = 0;
	
	//current floor values
	startTileDirection = 0;
	characterDirection = 0;
	characterMoved = 0;
	characterMoving = 0;
	movingIndex = 0;
	
	loadImages();
	gameArea.start();
	pl = new player(100, 120);
	generateRoom();
}

function loadImages() {
	var imgLoaded = false;
	ctx = gameArea.context;

	//basic images
	basicImage = new Array();
	basicImage.onload = function () {
		imgLoaded = true;
	}
	basicImage[0] = new Image();
	basicImage[0].src = "images/basic tile.png";
	basicImage[1] = new Image();
	basicImage[1].src = "images/enemy name border.jpg";
	basicImage[2] = new Image();
	basicImage[2].src = "images/helmet.png";
	basicImage[3] = new Image();
	basicImage[3].src = "images/gold.png";
	basicImage[4] = new Image();
	basicImage[4].src = "images/shopping cart.png";
	basicImage[5] = new Image();
	basicImage[5].src = "images/shop border image.png";
	basicImage[6] = new Image();
	basicImage[6].src = "images/hero ability selected.png";
	basicImage[7] = new Image();
	basicImage[7].src = "images/hero ability selected tilted.png";
	
	//staircase images
	staircase = new Array();
	staircase.onload = function () {
		imgLoaded = true;
	}
	staircase[0] = new Image();
	staircase[0].src = "images/staircase/staircase top right.png";
	staircase[1] = new Image();
	staircase[1].src = "images/staircase/staircase top left.png";
	staircase[2] = new Image();
	staircase[2].src = "images/staircase/staircase bottom right.png";
	staircase[3] = new Image();
	staircase[3].src = "images/staircase/staircase bottom left.png";
	staircase[4] = new Image();
	staircase[4].src = "images/staircase/staircase bottom top.png";
	staircase[5] = new Image();
	staircase[5].src = "images/staircase/staircase bottom bottom.png";
	
	//character images
	character = new Array();
	character.onload = function () {
		imgLoaded = true;
	}
	character[0] = new Image();
	character[0].src = "images/character/character face down.png";
	character[1] = new Image();
	character[1].src = "images/character/character move down right foot.png";
	character[2] = new Image();
	character[2].src = "images/character/character move down left foot.png";
	character[3] = new Image();
	character[3].src = "images/character/character face left.png";
	character[4] = new Image();
	character[4].src = "images/character/character move left right foot.png";
	character[5] = new Image();
	character[5].src = "images/character/character move left left foot.png";
	character[6] = new Image();
	character[6].src = "images/character/character face up.png";
	character[7] = new Image();
	character[7].src = "images/character/character move up right foot.png";
	character[8] = new Image();
	character[8].src = "images/character/character move up left foot.png";
	character[9] = new Image();
	character[9].src = "images/character/character face right.png";
	character[10] = new Image();
	character[10].src = "images/character/character move right right foot.png";
	character[11] = new Image();
	character[11].src = "images/character/character move right left foot.png";
	
	//skeleton enemy images
	skeleton = new Array();
	skeleton.onload = function () {
		imgLoaded = true;
	}
	skeleton[0] = new Image();
	skeleton[0].src = "images/enemies/skeleton face right.png";	
	skeleton[1] = new Image();
	skeleton[1].src = "images/enemies/skeleton face left.png";
	skeleton[2] = new Image();
	skeleton[2].src = "images/enemies/skeleton corpse.png";
	skeleton[3] = new Image();
	skeleton[3].src = "images/enemies/skeleton attack stance 1.png";
	skeleton[4] = new Image();
	skeleton[4].src = "images/enemies/skeleton attack stance 2.png";
	skeleton[5] = new Image();
	skeleton[5].src = "images/enemies/skeleton attack stance 3.png";
	skeleton[6] = new Image();
	skeleton[6].src = "images/enemies/skeleton attack stance 4.png";
	skeleton[7] = new Image();
	skeleton[7].src = "images/enemies/skeleton attack stance 5.png";
	skeleton[8] = new Image();
	skeleton[8].src = "images/enemies/skeleton attack stance 6.png";
	skeleton[9] = new Image();
	skeleton[9].src = "images/enemies/skeleton corpse 2.png";
	
	//combat item images
	combatItems = new Array();
	combatItems.onload = function () {
		imgLoaded = true;
	}
	combatItems[0] = new Image();
	combatItems[0].src = "images/combat items/potion.png";	
	combatItems[1] = new Image();
	combatItems[1].src = "images/combat items/potion motion 1.png";
	combatItems[2] = new Image();
	combatItems[2].src = "images/combat items/potion motion 2.png";
	combatItems[3] = new Image();
	combatItems[3].src = "images/combat items/potion motion 3.png";
	combatItems[4] = new Image();
	combatItems[4].src = "images/combat items/sword.png";	
	combatItems[5] = new Image();
	combatItems[5].src = "images/combat items/sword motion 1.png";
	combatItems[6] = new Image();
	combatItems[6].src = "images/combat items/sword motion 2.png";
	combatItems[7] = new Image();
	combatItems[7].src = "images/combat items/sword motion 3.png";
	
	//hero images
	heroImages = new Array();
	heroImages.onload = function () {
		imgLoaded = true;
	}
	heroImages[0] = new Image();
	heroImages[0].src = "images/hero images/shield.png";
	heroImages[1] = new Image();
	heroImages[1].src = "images/hero images/heart.png";	
	heroImages[2] = new Image();
	heroImages[2].src = "images/hero images/figure running.png";
	heroImages[3] = new Image();
	heroImages[3].src = "images/hero images/broken shield.png";
	heroImages[4] = new Image();
	heroImages[4].src = "images/hero images/fist.png";
	heroImages[5] = new Image();
	heroImages[5].src = "images/hero images/bicep.png";
	heroImages[6] = new Image();
	heroImages[6].src = "images/hero images/enrage motion 1.png";
	heroImages[7] = new Image();
	heroImages[7].src = "images/hero images/enrage motion 2.png";
	heroImages[8] = new Image();
	heroImages[8].src = "images/hero images/enrage motion 3.png";
	heroImages[9] = new Image();
	heroImages[9].src = "images/hero images/snail.png";
	heroImages[10] = new Image();
	heroImages[10].src = "images/hero images/question mark.png";
	heroImages[11] = new Image();
	heroImages[11].src = "images/hero images/question marks.png";
	heroImages[12] = new Image();
	heroImages[12].src = "images/hero images/poison.png";
	heroImages[13] = new Image();
	heroImages[13].src = "images/hero images/wanted icon.png";
	heroImages[14] = new Image();
	heroImages[14].src = "images/hero images/wanted poster.png";
	heroImages[15] = new Image();
	heroImages[15].src = "images/hero images/wanted square.png";
}

var gameArea = {
	canvas : document.createElement("canvas"),
	start : function() {
		this.canvas.width = 600;
		this.canvas.height = 600;
		this.context = this.canvas.getContext("2d");
		document.body.insertBefore(this.canvas, document.body.childNodes[0]);
		this.interval = setInterval(updateGameArea, 20);
		//generateRoom();
	},
	clear : function() {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}
};

function player(x, y) {
	this.width = TILE_SIZE * 2 / 3;
	this.height = TILE_SIZE * 2 / 3;
	this.x = x;
	this.y = y;
	this.incrementMoveSize = 8;
	
	this.update = function() {
		ctx = gameArea.context;
		if (characterMoved === 0) { //character starting direction based on starting tile
			if (startTileDirection === "right") {
				ctx.drawImage(character[9], this.x + TILE_SIZE * 1 / 7, this.y);
			} else 	if (startTileDirection === "left") {
				ctx.drawImage(character[3], this.x + TILE_SIZE * 1 / 7, this.y);
			} else 	if (startTileDirection === "up") {
				ctx.drawImage(character[6], this.x + TILE_SIZE * 1 / 7, this.y);
			} else {
				ctx.drawImage(character[0], this.x + TILE_SIZE * 1 / 7, this.y);
			}
		} else {
			if (characterDirection === "right") {
				if (characterMoving === 1) { //moving images
					if (movingIndex < TILE_SPACE) {
						if (movingIndex % 2 === 0) {
							ctx.drawImage(character[10], this.x + TILE_SIZE * 1 / 7 - TILE_SPACE + movingIndex, this.y);
						} else {
							ctx.drawImage(character[11], this.x + TILE_SIZE * 1 / 7 - TILE_SPACE + movingIndex, this.y);
						}
						movingIndex += this.incrementMoveSize;
					} else {
						ctx.drawImage(character[9], this.x + TILE_SIZE * 1 / 7, this.y);
						characterMoving = 0;
						movingIndex = 0;
					}
				} else { //stationary image
					ctx.drawImage(character[9], this.x + TILE_SIZE * 1 / 7, this.y);
				}
			} else 	if (characterDirection === "left") {
				if (characterMoving === 1) { //moving images
					if (movingIndex < TILE_SPACE) {
						if (movingIndex % 2 === 0) {
							ctx.drawImage(character[4], this.x + TILE_SIZE * 1 / 7 + TILE_SPACE - movingIndex, this.y);
						} else {
							ctx.drawImage(character[5], this.x + TILE_SIZE * 1 / 7 + TILE_SPACE - movingIndex, this.y);
						}
						movingIndex += this.incrementMoveSize;
					} else {
						ctx.drawImage(character[3], this.x + TILE_SIZE * 1 / 7, this.y);
						characterMoving = 0;
						movingIndex = 0;
					}
				} else { //stationary image
					ctx.drawImage(character[3], this.x + TILE_SIZE * 1 / 7, this.y);
				}
			} else 	if (characterDirection === "up") {
				if (characterMoving === 1) { //moving images
					if (movingIndex < TILE_SPACE) {
						if (movingIndex % 2 === 0) {
							ctx.drawImage(character[7], this.x + TILE_SIZE * 1 / 7, this.y + TILE_SPACE - movingIndex);
						} else {
							ctx.drawImage(character[8], this.x + TILE_SIZE * 1 / 7, this.y + TILE_SPACE - movingIndex);
						}
						movingIndex += this.incrementMoveSize;
					} else {
						ctx.drawImage(character[6], this.x + TILE_SIZE * 1 / 7, this.y);
						characterMoving = 0;
						movingIndex = 0;
					}
				} else { //stationary image
					ctx.drawImage(character[6], this.x + TILE_SIZE * 1 / 7, this.y);
				}
			} else {
				if (characterMoving === 1) { //moving images
					if (movingIndex < TILE_SPACE) {
						if (movingIndex % 2 === 0) {
							ctx.drawImage(character[1], this.x + TILE_SIZE * 1 / 7, this.y - TILE_SPACE + movingIndex);
						} else {
							ctx.drawImage(character[2], this.x + TILE_SIZE * 1 / 7, this.y - TILE_SPACE + movingIndex);
						}
						movingIndex += this.incrementMoveSize;
					} else {
						ctx.drawImage(character[0], this.x + TILE_SIZE * 1 / 7, this.y);
						characterMoving = 0;
						movingIndex = 0;
					}
				} else { //stationary image
					ctx.drawImage(character[0], this.x + TILE_SIZE * 1 / 7, this.y);
				}	
			}
		}
	};
	
	position = null;
	
	//combat variables and related shop variables
	this.hp = 100;
	this.speedEntropy = Math.floor(Math.random() * 100);
	this.turnStorage = 0;
	
	this.name = "";
	
	this.priceScale = 1.2;
	
	this.speed = 45;
	this.speedRank = 0;
	this.speedCost = 100;
	
	this.weaponRank = 0;
	this.baseDamage = 5;
	this.damageRange = 5;
	this.weaponCost = 100;
	this.attacking = 0;
	this.attackMotion = 0;
	this.otherMotion = 0;
	this.rampageAttack = 0;
	this.enrageAnimation = 0;
	this.hamperAnimation = 0;
	this.crushAnimation = 0;
	this.xChange = 0;
	this.yChange = 0;
	this.viperAnimation = 0;
	this.bountyAnimation = 0;
	
	this.armorRank = 0;
	this.armor = 3;
	this.armorCost = 100;
	
	this.potionRank = 0;
	this.potions = 5;
	this.potionUpgradeCost = 100;
	this.potionCost = 50;
	this.drinkingPotion = 0;
	this.potionMotion = 0;
	
	this.damageTaken = [];
	this.hitsTaken = 0;
	
	//hero ability variables
	this.abilityPoints = 0;
	this.offenseAbility = [0,0,0,0,0,0,0,0,0,0];
	this.defenseAbility = [0,0,0,0,0,0,0,0,0,0];
	this.utilityAbility = [0,0,0,0,0,0,0,0,0,0];
	this.offenseTier = 0;
	this.defenseTier = 0;
	this.utilityTier = 0;
	this.rampage = 0;
	this.hamper = 0;
	this.viperStrike = 0;
	this.bonusDamage = 1;
	this.armorPen = 0;
	this.bonusArmor = 1;
	this.regen = 0;
	this.bonusGold = 1;
	this.bonusSpeed = 1;
	this.healed = 0;
	this.isEnraged = 0;
}

function enemy(x, y) {
	this.width = TILE_SIZE * 2 / 3;
	this.height = TILE_SIZE * 18 / 21;
	this.x = x;
	this.y = y;

	this.alreadyRandomized = 0;
	this.rand = 0;
	
	this.update = function() {
		ctx = gameArea.context;
		if (this.type === "Skeleton") {
			// pick a random direction
			if (this.alreadyRandomized === 0) {
				this.rand = Math.floor(Math.random() * 2); 
				this.alreadyRandomized = 1;
			}
			if (this.alive === 1) {
				ctx.drawImage(skeleton[this.rand], this.x + TILE_SIZE * 1 / 7, this.y, this.width, this.height);
			} else {
				if (this.rand === 1) {
					ctx.drawImage(skeleton[2], this.x + TILE_SIZE * 1 / 10, this.y, this.width * 3 / 2, this.height * 7 / 10);
				} else {
					ctx.drawImage(skeleton[9], this.x + TILE_SIZE * 1 / 10, this.y, this.width * 3 / 2, this.height * 7 / 10);
				}
			}
		}
	};
	
	position = null;
	
	diffScale = Math.pow(1.1, dungeonLevel);
	this.type = "Skeleton";
	this.hp = Math.floor(diffScale * 50);
	this.starthp = this.hp;
	this.speed = Math.floor(diffScale * 30);
	this.speedEntropy = Math.floor(Math.random() * 100);
	this.baseDamage = Math.floor(diffScale * 5);
	this.damageRange = Math.floor(diffScale * 5);
	this.armor = Math.floor(diffScale);
	this.turnStorage = 0;
	this.poison = 0;
	this.hitsTaken = 0;
	this.damageTaken = [];
	this.poisonDamageTaken = [];
	this.poisonHitsTaken = 0;
	this.isBounty = 0;
	this.renderAttackImage = 0;
	this.renderAttackImageStance = 0;
	this.stanceUp = 1;
	
	this.alive = 1;
}

function startTile(x, y) {
	pl.update();
	this.width = TILE_SIZE;
	this.height = TILE_SIZE;
	this.x = x;
	this.y = y;
	
	this.alreadyRandomized = 0;
	this.rand = 0;
	
	this.update = function() {
		ctx = gameArea.context;
		if (this._right !== "null") { // player exits to the right
			ctx.drawImage(staircase[0], this.x, this.y);
			startTileDirection = "right";
		} else if (this._left !== "null") { // player exits to the left
			ctx.drawImage(staircase[1], this.x, this.y);
			startTileDirection = "left";
		} else { // player exits top or bottom
			// pick a random direction
			if (this.alreadyRandomized === 0) {
				rand = Math.floor(Math.random() * 2); 
				this.alreadyRandomized = 1;
			}
			ctx.drawImage(staircase[rand], this.x, this.y);
			if (this._up !== "null") {
				startTileDirection = "up";
			} else {
				startTileDirection = "down";
			}
		}
	};
	
	this._left = "null";
	this._right = "null";
	this._up = "null";
	this._down = "null";
	
	this.containedEnemy = "null";
}

function floorTile(x, y) {
	this.width = TILE_SIZE;
	this.height = TILE_SIZE;
	this.x = x;
	this.y = y;

	this.alreadyRandomized = 0;
	this.rand = 0;
	
	this.update = function() {
		ctx = gameArea.context;
		ctx.fillStyle = "grey";
		if(this.isEnd === 1) {
			if (this._right !== "null") { // player enters from the right
				ctx.drawImage(staircase[2], this.x, this.y);
			} else if (this._left !== "null") { // player enters from the left
				ctx.drawImage(staircase[3], this.x, this.y);
			} else if (this._up !== "null") { // player enters from top
				ctx.drawImage(staircase[4], this.x, this.y);
			} else if (this._bottom !== "null") { // player enters from bottom
				ctx.drawImage(staircase[5], this.x, this.y);	
			}
		}
		else {
			ctx.drawImage(basicImage[0], this.x, this.y);
		}
	};
	
	this._left = "null";
	this._right = "null";
	this._up = "null";
	this._down = "null";
	
	this.isEnd = 0;
	
	this.containedEnemy = "null";
}

function updateGameArea() {
	gameArea.clear();
	
	if(scoreboardActive === 1) {
		ctx.fillStyle = "black";
		ctx.fillRect(0,0, 600, 600);
		ctx.fillStyle = "white";
		ctx.font = "20px Consolas";
		if(serverConnection === 1) {
			//ctx.fillText("Success", 20, 40);
			drawOutput(highScoresText);
		}
		else {
			//ctx.fillText("Failed", 20, 40);
			drawError();
		}
		ctx.fillStyle = "black";
		ctx.fillRect(0,0,600,50);
		ctx.fillStyle = "white";
		ctx.font = "20px Consolas";
		ctx.fillText("High Scores", 250, 20);
		ctx.fillText("Rank", 30, 40);
		ctx.fillText("Name", 90, 40);
		ctx.fillText("Score", 300, 40);
		ctx.fillText("Floor", 500, 40);
	}
	else if(gameOver === 1) {
		//draw gameover screen
		ctx = gameArea.context;
		ctx.fillStyle = "black";
		ctx.fillRect(0, 0, 600, 600);
		ctx.fillStyle = "red";
		ctx.font = "40px Consolas";
		ctx.fillText("GAME OVER", 200, 200);
		ctx.fillText("Score: " + score, 200, 300);
		if(sentHighScores === 0) {
			ctx.fillStyle = "white";
			ctx.fillRect(100, 335, 400, 30);
			ctx.fillStyle = "black";
			ctx.font = "30px Consolas";
			ctx.fillText(pl.name, 100, 360);
		}
	}
	else if(abilitiesActive === 1) {
		//draw hero abilities screen
		ctx = gameArea.context;
		
		//draw menu title
		ctx.fillStyle = "white";
		ctx.font = "20px Consolas";
		ctx.fillText("Hero Abilities", 120, 30);
		ctx.fillText("Points: " + pl.abilityPoints, 360, 30);
		
		//draw offense section
		ctx.fillStyle = "red";
		ctx.fillRect(15, 40, 180, 355);
		
		//draw defensive section
		ctx.fillStyle = "blue";
		ctx.fillRect(210, 40, 180, 355);
		
		//draw utility section
		ctx.fillStyle = "yellow";
		ctx.fillRect(405, 40, 180, 355);
		
		//title bg
		ctx.fillStyle = "black";
		ctx.fillRect(15, 40, 180, 30);
		ctx.fillRect(210, 40, 180, 30);
		ctx.fillRect(405, 40, 180, 30);
		
		//highlight ability selection
		var xPos = 0;
		var yPos = 0;
		ctx.fillStyle = "green";
		if(abilitySelected === 0) {
			ctx.fillRect(15, 40, 180, 30);
			xPos = 30;
			yPos = 80 + 80 * pl.offenseTier;
		}
		else if(abilitySelected === 1) {
			ctx.fillRect(210, 40, 180, 30);
			xPos = 225;
			yPos = 80 + 80 * pl.defenseTier;
		}
		else if(abilitySelected === 2) {
			ctx.fillRect(405, 40, 180, 30);
			xPos = 420;
			yPos = 80 + 80 * pl.utilityTier;
		}
		
		//highlight column selection
		ctx.fillStyle = "green";
		if(columnSelected === 0) {
			//left
			if((abilitySelected === 0 && pl.offenseTier < 3) || (abilitySelected === 1 && pl.defenseTier < 3) || (abilitySelected === 2 && pl.utilityTier < 3)) {
				ctx.fillRect(xPos - 5, yPos - 5, 50, 50);
			}
			else {
				ctx.fillRect(xPos - 15, yPos - 5, 180, 60);
			}
		}
		else if(columnSelected === 1) {
			//middle
			if((abilitySelected === 0 && pl.offenseTier < 3) || (abilitySelected === 1 && pl.defenseTier < 3) || (abilitySelected === 2 && pl.utilityTier < 3)) {
				ctx.fillRect(xPos - 5 + 55, yPos - 5, 50, 50);
			}
			else {
				ctx.fillRect(xPos - 15, yPos - 5, 180, 60);
			}
		}
		else if(columnSelected === 2) {
			//right
			if((abilitySelected === 0 && pl.offenseTier < 3) || (abilitySelected === 1 && pl.defenseTier < 3) || (abilitySelected === 2 && pl.utilityTier < 3)) {
				ctx.fillRect(xPos - 5 + 110, yPos - 5, 50, 50);
			}
			else {
				ctx.fillRect(xPos - 15, yPos - 5, 180, 60);
			}
		}
		
		//draw description pop-up
		ctx.fillStyle = "grey";
		ctx.fillRect(15, 405, 570, 180);
		
		//fill description pop-up
		ctx.fillStyle = "white";
		if(abilitySelected === 0) {
			//offense
			if(pl.offenseTier < 3) {
				//not ult
				if(columnSelected === 0) {
					ctx.fillText("Wrath - Passive", 20, 425);
					ctx.fillText("Deal 20% increase damage.", 30, 445);
					ctx.fillText("Stacks with additional ranks.", 30, 465);
				}
				else if(columnSelected === 1) {
					ctx.fillText("Rampage - Active", 20, 425);
					ctx.fillText("Perform an attack with +5 base damage and", 30, 445);
					ctx.fillText("+5 damage range.", 30, 465);
					ctx.fillText("Bonuses stack with additional ranks.", 30, 485);
				}
				else if(columnSelected === 2) {
					ctx.fillText("Sunder - Passive", 20, 425);
					ctx.fillText("Gain +2 armor penetration.", 30, 445);
					ctx.fillText("Stacks with additonal ranks.", 30, 465);
				}
			}
			else {
				ctx.fillText("Enrage - Active", 20, 425);
				ctx.fillText("Take 2 additional turns after this one and deal", 30, 445);
				ctx.fillText("30% increased damage until combat ends.", 30, 465);
				ctx.fillText("Receive 20% increase damage until combat ends.", 30, 485);
			}
		}
		else if(abilitySelected === 1) {
			//defense
			if(pl.defenseTier < 3) {
				//not ult
				if(columnSelected === 0) {
					ctx.fillText("Barrier - Passive", 20, 425);
					ctx.fillText("Gain 20% increased armor.", 30, 445);
					ctx.fillText("Stacks with additional ranks.", 30, 465);
				}
				else if(columnSelected === 1) {
					ctx.fillText("Hamper - Active", 20, 425);
					ctx.fillText("Deal standard attack damage.", 30, 445);
					ctx.fillText("Reduce target's turn entropy by 20.", 30, 465);
					ctx.fillText("Stacks with additional ranks.", 30, 485);
				}
				else if(columnSelected === 2) {
					ctx.fillText("Regeneration - Passive", 20, 425);
					ctx.fillText("Heal 2 HP per turn.", 30, 445);
					ctx.fillText("Stacks with additional ranks.", 30, 465);
				}
			}
			else {
				ctx.fillText("Crush - Active", 20, 425);
				ctx.fillText("Deal standard attack damage.", 30, 445);
				ctx.fillText("Stun target (reduce target's turn entropy", 30, 465);
				ctx.fillText("and storage to 0).", 30, 485);
			}
		}
		else if(abilitySelected === 2) {
			//utility
			if(pl.utilityTier < 3) {
				//not ult
				if(columnSelected === 0) {
					ctx.fillText("Midas Touch - Passive", 20, 425);
					ctx.fillText("Gain 20% increased gold from all sources.", 30, 445);
					ctx.fillText("Stacks with additional ranks.", 30, 465);
				}
				else if(columnSelected === 1) {
					ctx.fillText("Viper Strike - Active", 20, 425);
					ctx.fillText("Attack with -2 base damage and -2 damage range.", 30, 445);
					ctx.fillText("Apply 2 poison to target if damage is dealt.", 30, 465);
					ctx.fillText("Stacks with additonal ranks.", 30, 485);
				}
				else if(columnSelected === 2) {
					ctx.fillText("Quickness - Passive", 20, 425);
					ctx.fillText("Gain 20% incrased speed.", 30, 445);
					ctx.fillText("Stacks with additional ranks.", 30, 465);
				}
			}
			else {
				ctx.fillText("Seek Bounty - Active", 20, 425);
				ctx.fillText("Take an additional turn after this one.", 30, 445);
				ctx.fillText("Receive 200% increased gold from target.", 30, 465);
			}
		}
		
		if(columnSelected !== "null") {
			ctx.fillText("(A)ccept", 20, 575);
			ctx.fillStyle = "red";
			ctx.fillText(abilityError, 130, 575);
		}

		//draw section titles
		ctx.fillStyle = "white";
		ctx.fillText("(O)ffense", 25, 60);
		ctx.fillText("(D)efense", 220, 60);
		ctx.fillText("(U)tility", 415, 60);
		
		//populate ability sections
		xPos = 30;
		yPos = 80;
		
		//draw offensive abilities
		ctx.fillStyle = "grey";
		
		//tier 1
		if(pl.offenseAbility[0] === 1) {
			ctx.drawImage(basicImage[6], xPos, yPos, 40, 40);
		} else {
			ctx.fillRect(xPos, yPos, 40, 40);
		}
		//draw wrath
		ctx.drawImage(combatItems[4], xPos + 5, yPos + 2, 35, 35);
		
		if(pl.offenseAbility[1] === 1) {
			ctx.drawImage(basicImage[7], xPos + 50, yPos - 2, 50, 50);
		}
		else {
			ctx.beginPath();
			ctx.moveTo(xPos + 50, yPos + 20);
			ctx.lineTo(xPos + 50 + 25, yPos + 20 - 25);
			ctx.lineTo(xPos + 50 + 50, yPos + 20);
			ctx.lineTo(xPos + 50 + 25, yPos + 20 + 25);
			ctx.closePath();
			ctx.fill();
		}
		//draw rampage
		ctx.drawImage(heroImages[4], xPos + 57, yPos + 2, 33, 35);

		if(pl.offenseAbility[2] === 1) {
			ctx.drawImage(basicImage[6], xPos + 110, yPos, 40, 40);
		}
		else {
			ctx.fillRect(xPos + 110, yPos, 40, 40);
		}
		//draw sunder
		ctx.drawImage(heroImages[3], xPos + 113, yPos + 3, 35, 35);
		
		//tier 2
		yPos = 160;
		if(pl.offenseAbility[3] === 1) {
			ctx.drawImage(basicImage[6], xPos, yPos, 40, 40);
		}
		else {
			ctx.fillRect(xPos, yPos, 40, 40);
		}
		//draw wrath
		ctx.drawImage(combatItems[4], xPos + 5, yPos + 2, 35, 35);
		
		if(pl.offenseAbility[4] === 1) {
			ctx.drawImage(basicImage[7], xPos + 50, yPos - 2, 50, 50);
		}
		else {
			ctx.beginPath();
			ctx.moveTo(xPos + 50, yPos + 20);
			ctx.lineTo(xPos + 50 + 25, yPos + 20 - 25);
			ctx.lineTo(xPos + 50 + 50, yPos + 20);
			ctx.lineTo(xPos + 50 + 25, yPos + 20 + 25);
			ctx.closePath();
			ctx.fill();
		}
		//draw rampage
		ctx.drawImage(heroImages[4], xPos + 57, yPos + 2, 33, 35);
		
		if(pl.offenseAbility[5] === 1) {
			ctx.drawImage(basicImage[6], xPos + 110, yPos, 40, 40);
		}
		else {
			ctx.fillRect(xPos + 110, yPos, 40, 40);
		}
		//draw sunder
		ctx.drawImage(heroImages[3], xPos + 113, yPos + 3, 35, 35);
		
		//tier 3
		yPos = 240;
		if(pl.offenseAbility[6] === 1) {
			ctx.drawImage(basicImage[6], xPos, yPos, 40, 40);
		}
		else {
			ctx.fillRect(xPos, yPos, 40, 40);
		}
		//draw wrath
		ctx.drawImage(combatItems[4], xPos + 5, yPos + 2, 35, 35);

		if(pl.offenseAbility[7] === 1) {
			ctx.drawImage(basicImage[7], xPos + 50, yPos - 2, 50, 50);
		}
		else {
			ctx.beginPath();
			ctx.moveTo(xPos + 50, yPos + 20);
			ctx.lineTo(xPos + 50 + 25, yPos + 20 - 25);
			ctx.lineTo(xPos + 50 + 50, yPos + 20);
			ctx.lineTo(xPos + 50 + 25, yPos + 20 + 25);
			ctx.closePath();
			ctx.fill();
		}
		//draw rampage
		ctx.drawImage(heroImages[4], xPos + 57, yPos + 2, 33, 35);
		
		if(pl.offenseAbility[8] === 1) {
			ctx.drawImage(basicImage[6], xPos + 110, yPos, 40, 40);
		}
		else {
			ctx.fillRect(xPos + 110, yPos, 40, 40);
		}
		//draw sunder
		ctx.drawImage(heroImages[3], xPos + 113, yPos + 3, 35, 35);
		
		//tier 4
		yPos = 300;
		if(pl.offenseAbility[9] === 1) {
			ctx.drawImage(basicImage[7], xPos + 35, yPos, 80, 80);
		}
		else {
			ctx.beginPath();
			ctx.moveTo(xPos + 35, yPos + 40);
			ctx.lineTo(xPos + 35 + 40, yPos);
			ctx.lineTo(xPos + 35 + 80, yPos + 40);
			ctx.lineTo(xPos + 35 + 40, yPos + 80);
			ctx.closePath();
			ctx.fill();
		}
		//draw enrage
		ctx.drawImage(heroImages[5], xPos + 47, yPos + 10, 50, 53);
		
		//draw defensive abilities
		xPos = 225;
		//tier 1
		yPos = 80;
		if(pl.defenseAbility[0] === 1) {
			ctx.drawImage(basicImage[6], xPos, yPos, 40, 40);
		}
		else {
			ctx.fillRect(xPos, yPos, 40, 40);
		}
		//draw barrier
		ctx.drawImage(heroImages[0], xPos + 5, yPos + 4, 30, 32);

		if(pl.defenseAbility[1] === 1) {
			ctx.drawImage(basicImage[7], xPos + 50, yPos - 2, 50, 50);
		}
		else {
			ctx.beginPath();
			ctx.moveTo(xPos + 50, yPos + 20);
			ctx.lineTo(xPos + 50 + 25, yPos + 20 - 25);
			ctx.lineTo(xPos + 50 + 50, yPos + 20);
			ctx.lineTo(xPos + 50 + 25, yPos + 20 + 25);
			ctx.closePath();
			ctx.fill();
		}
		//draw hamper
		ctx.drawImage(heroImages[9], xPos + 53, yPos, 37, 35);
		
		if(pl.defenseAbility[2] === 1) {
			ctx.drawImage(basicImage[6], xPos + 110, yPos, 40, 40);
		}
		else {
			ctx.fillRect(xPos + 110, yPos, 40, 40);
		}
		//draw regeneration
		ctx.drawImage(heroImages[1], xPos + 114, yPos + 2, 33, 37);
		
		//tier 2
		yPos = 160;
		if(pl.defenseAbility[3] === 1) {
			ctx.drawImage(basicImage[6], xPos, yPos, 40, 40);
		}
		else {
			ctx.fillRect(xPos, yPos, 40, 40);
		}
		//draw barrier
		ctx.drawImage(heroImages[0], xPos + 5, yPos + 4, 30, 32);
		
		if(pl.defenseAbility[4] === 1) {
			ctx.drawImage(basicImage[7], xPos + 50, yPos - 2, 50, 50);
		}
		else {
			ctx.beginPath();
			ctx.moveTo(xPos + 50, yPos + 20);
			ctx.lineTo(xPos + 50 + 25, yPos + 20 - 25);
			ctx.lineTo(xPos + 50 + 50, yPos + 20);
			ctx.lineTo(xPos + 50 + 25, yPos + 20 + 25);
			ctx.closePath();
			ctx.fill();
		}
		//draw hamper
		ctx.drawImage(heroImages[9], xPos + 53, yPos, 37, 35);
		
		if(pl.defenseAbility[5] === 1) {
			ctx.drawImage(basicImage[6], xPos + 110, yPos, 40, 40);
		}
		else {
			ctx.fillRect(xPos + 110, yPos, 40, 40);
		}
		//draw regeneration
		ctx.drawImage(heroImages[1], xPos + 114, yPos + 2, 33, 37);
		
		//tier 3
		yPos = 240;
		if(pl.defenseAbility[6] === 1) {
			ctx.drawImage(basicImage[6], xPos, yPos, 40, 40);
		}
		else {
			ctx.fillRect(xPos, yPos, 40, 40);
		}
		//draw barrier
		ctx.drawImage(heroImages[0], xPos + 5, yPos + 4, 30, 32);
		
		if(pl.defenseAbility[7] === 1) {
			ctx.drawImage(basicImage[7], xPos + 50, yPos - 2, 50, 50);
		}
		else {
			ctx.beginPath();
			ctx.moveTo(xPos + 50, yPos + 20);
			ctx.lineTo(xPos + 50 + 25, yPos + 20 - 25);
			ctx.lineTo(xPos + 50 + 50, yPos + 20);
			ctx.lineTo(xPos + 50 + 25, yPos + 20 + 25);
			ctx.closePath();
			ctx.fill();
		}
		//draw hamper
		ctx.drawImage(heroImages[9], xPos + 53, yPos, 37, 35);
		
		if(pl.defenseAbility[8] === 1) {
			ctx.drawImage(basicImage[6], xPos + 110, yPos, 40, 40);
		}
		else {
			ctx.fillRect(xPos + 110, yPos, 40, 40);
		}
		//draw regeneration
		ctx.drawImage(heroImages[1], xPos + 114, yPos + 2, 33, 37);
		
		//tier 4
		yPos = 300;
		if(pl.defenseAbility[9] === 1) {
			ctx.drawImage(basicImage[7], xPos + 35, yPos, 80, 80);
		}
		else {
			ctx.beginPath();
			ctx.moveTo(xPos + 35, yPos + 40);
			ctx.lineTo(xPos + 35 + 40, yPos);
			ctx.lineTo(xPos + 35 + 80, yPos + 40);
			ctx.lineTo(xPos + 35 + 40, yPos + 80);
			ctx.closePath();
			ctx.fill();
		}
		//draw crush
		ctx.drawImage(heroImages[11], xPos + 50, yPos + 20, 45, 45);
		
		//draw utility abilities
		xPos = 420;
		//tier 1
		yPos = 80;
		if(pl.utilityAbility[0] === 1) {
			ctx.drawImage(basicImage[6], xPos, yPos, 40, 40);
		}
		else {
			ctx.fillRect(xPos, yPos, 40, 40);
		}
		//draw midas touch
		ctx.drawImage(basicImage[3], xPos + 1, yPos + 3, 38, 32);
		
		if(pl.utilityAbility[1] === 1) {
			ctx.drawImage(basicImage[7], xPos + 50, yPos - 2, 50, 50);
		}
		else {
			ctx.beginPath();
			ctx.moveTo(xPos + 50, yPos + 20);
			ctx.lineTo(xPos + 50 + 25, yPos + 20 - 25);
			ctx.lineTo(xPos + 50 + 50, yPos + 20);
			ctx.lineTo(xPos + 50 + 25, yPos + 20 + 25);
			ctx.closePath();
			ctx.fill();
		}
		//draw viper strike
		ctx.drawImage(heroImages[12], xPos + 55, yPos - 4, 38, 44);
		
		if(pl.utilityAbility[2] === 1) {
			ctx.drawImage(basicImage[6], xPos + 110, yPos, 40, 40);
		}
		else {
			ctx.fillRect(xPos + 110, yPos, 40, 40);
		}	
		//draw quickness
		ctx.drawImage(heroImages[2], xPos + 114, yPos + 2, 33, 34);
		
		//tier 2
		yPos = 160;
		if(pl.utilityAbility[3] === 1) {
			ctx.drawImage(basicImage[6], xPos, yPos, 40, 40);
		}
		else {
			ctx.fillRect(xPos, yPos, 40, 40);
		}
		//draw midas touch
		ctx.drawImage(basicImage[3], xPos + 1, yPos + 3, 38, 32);
		
		if(pl.utilityAbility[4] === 1) {
			ctx.drawImage(basicImage[7], xPos + 50, yPos - 2, 50, 50);
		}
		else {
			ctx.beginPath();
			ctx.moveTo(xPos + 50, yPos + 20);
			ctx.lineTo(xPos + 50 + 25, yPos + 20 - 25);
			ctx.lineTo(xPos + 50 + 50, yPos + 20);
			ctx.lineTo(xPos + 50 + 25, yPos + 20 + 25);
			ctx.closePath();
			ctx.fill();
		}
		//draw viper strike
		ctx.drawImage(heroImages[12], xPos + 55, yPos - 4, 38, 44);
		
		if(pl.utilityAbility[5] === 1) {
			ctx.drawImage(basicImage[6], xPos + 110, yPos, 40, 40);
		}
		else {
			ctx.fillRect(xPos + 110, yPos, 40, 40);
		}
		//draw quickness
		ctx.drawImage(heroImages[2], xPos + 114, yPos + 2, 33, 34);
		
		//tier 3
		yPos = 240;
		if(pl.utilityAbility[6] === 1) {
			ctx.drawImage(basicImage[6], xPos, yPos, 40, 40);
		}
		else {
			ctx.fillRect(xPos, yPos, 40, 40);
		}
		//draw midas touch
		ctx.drawImage(basicImage[3], xPos + 1, yPos + 3, 38, 32);
		
		if(pl.utilityAbility[7] === 1) {
			ctx.drawImage(basicImage[7], xPos + 50, yPos - 2, 50, 50);
		}
		else {
			ctx.beginPath();
			ctx.moveTo(xPos + 50, yPos + 20);
			ctx.lineTo(xPos + 50 + 25, yPos + 20 - 25);
			ctx.lineTo(xPos + 50 + 50, yPos + 20);
			ctx.lineTo(xPos + 50 + 25, yPos + 20 + 25);
			ctx.closePath();
			ctx.fill();
		}
		//draw viper strike
		ctx.drawImage(heroImages[12], xPos + 55, yPos - 4, 38, 44);
		
		if(pl.utilityAbility[8] === 1) {
			ctx.drawImage(basicImage[6], xPos + 110, yPos, 40, 40);
		}
		else {
			ctx.fillRect(xPos + 110, yPos, 40, 40);
		}
		//draw quickness
		ctx.drawImage(heroImages[2], xPos + 114, yPos + 2, 33, 34);
		
		//tier 4
		yPos = 300;
		if(pl.utilityAbility[9] === 1) {
			ctx.drawImage(basicImage[7], xPos + 35, yPos, 80, 80);
		}
		else {
			ctx.beginPath();
			ctx.moveTo(xPos + 35, yPos + 40);
			ctx.lineTo(xPos + 35 + 40, yPos);
			ctx.lineTo(xPos + 35 + 80, yPos + 40);
			ctx.lineTo(xPos + 35 + 40, yPos + 80);
			ctx.closePath();
			ctx.fill();
		}
		//draw seek bounty
		ctx.drawImage(heroImages[13], xPos + 44, yPos + 9, 62, 62);
	}
	else if(shopActive === 1) {
		//draw shop screen
		
		//draw backghround
		ctx = gameArea.context;
		ctx.fillStyle = "grey";
		ctx.fillRect(10, 10, 580, 580);
		ctx.drawImage(basicImage[5], 10, 80, 580, 510);
		
		//draw gold
		ctx.font = "20px Consolas";
		ctx.fillStyle = "white";
		ctx.fillText("Gold:   " + gold, 15, 50);
		ctx.drawImage(basicImage[3], 74, 34, 30, 18);
		
		//draw potions
		ctx.fillStyle = "white";
		ctx.font = "17px Consolas";
		ctx.fillText("(P)otions", 200, 180);
		ctx.fillText("Cost: " + pl.potionCost, 200, 200);
		ctx.fillText("Current Pots: " + pl.potions, 345, 190);
		
		//draw potion upgrade
		ctx.fillStyle = "white";
		ctx.font = "17px Consolas";
		ctx.fillText("P(o)tion", 200, 241);
		ctx.fillText("Upgrade", 200, 261);
		ctx.fillText("Cost: " + pl.potionUpgradeCost, 200, 281);
		ctx.fillText("Current Rank: " + pl.potionRank, 345, 261);

		//draw speed upgrade
		ctx.fillStyle = "white";
		ctx.font = "17px Consolas";
		ctx.fillText("Sp(e)ed", 200, 310);
		ctx.fillText("Upgrade", 200, 330);
		ctx.fillText("Cost: " + pl.speedCost, 200, 350);
		ctx.fillText("Current Rank: " + pl.speedRank, 345, 330);
		
		//draw weapon upgrade
		ctx.fillStyle = "white";
		ctx.font = "17px Consolas";
		ctx.fillText("(W)eapon", 200, 380);
		ctx.fillText("Upgrade", 200, 400);
		ctx.fillText("Cost: " + pl.weaponCost, 200, 420);
		ctx.fillText("Current Rank: " + pl.weaponRank, 345, 400);
		
		//draw armor upgrade
		ctx.fillStyle = "white";
		ctx.font = "17px Consolas";
		ctx.fillText("(A)rmor", 200, 450);
		ctx.fillText("Upgrade", 200, 470);
		ctx.fillText("Cost: " + pl.armorCost, 200, 490);
		ctx.fillText("Current Rank: " + pl.armorRank, 345, 470);
	}
	else if(combatActive === 1) {
		//draw combat screen
		
		//draw background
		ctx = gameArea.context;
		ctx.fillStyle = "grey";
		ctx.fillRect(10, 10, 580, 580);
		
		//draw enemy
		if (target.type === "Skeleton") {	
			if (target.renderAttackImage === 1) {
				if (target.stanceUp) {
					target.renderAttackImageStance++;
					if (target.renderAttackImageStance === 6) {
						target.stanceUp = 0;
					}
				} else {
					target.renderAttackImageStance--;
					if (target.renderAttackImageStance === 1) {
						target.stanceUp = 1;
						target.renderAttackImage = 0;
					}
				}
				ctx.drawImage(skeleton[2 + target.renderAttackImageStance], 380, 75, 130, 180);
			} else {
				ctx.drawImage(skeleton[1], 380, 75, 130, 180);
			}
		}
		
		//draw player
		if (pl.drinkingPotion === 1) {
			pl.potionMotion++;
			var frameLength = 6;
			if (pl.potionMotion < frameLength) {	
				ctx.drawImage(combatItems[1], 100, 435, 115, 115);
			} else if (pl.potionMotion < frameLength * 2) {	
				ctx.drawImage(combatItems[2], 100, 435, 115, 115);
			} else if (pl.potionMotion < frameLength * 3) {	
				ctx.drawImage(combatItems[3], 100, 435, 115, 115);
			} else {
				pl.drinkingPotion = 0;
				ctx.drawImage(character[6], 100, 435, 105, 115);
			}
		} else if (pl.attacking === 1) {
			var combatOffset = 4;
			pl.attackMotion++;
			var frameLength = 3;
			if (pl.attackMotion < frameLength) {	
				ctx.drawImage(combatItems[combatOffset + 1], 100, 435, 160, 115);
			} else if (pl.attackMotion < frameLength * 2) {	
				ctx.drawImage(combatItems[combatOffset + 2], 100, 435, 160, 115);
			} else if (pl.attackMotion < frameLength * 3) {	
				ctx.drawImage(combatItems[combatOffset + 3], 100, 435, 160, 115);
			} else {
				pl.attacking = 0;
				ctx.drawImage(character[6], 100, 435, 105, 115);
			}
		} else if (pl.rampageAttack === 1) {
			var combatOffset = 4;
			pl.attackMotion++;
			var frameLength = 15;
			if (pl.attackMotion < frameLength) {
				if (pl.attackMotion < (frameLength / 2)) {
					ctx.drawImage(character[10], 100, 435, 105, 115);
				} else {
					ctx.drawImage(character[6], 100, 435, 105, 115);
				}
				ctx.drawImage(heroImages[4], 120 + pl.attackMotion * 20, 360 - pl.attackMotion * 20, 80, 80);
			} else {
				pl.rampageAttack = 0;
				ctx.drawImage(character[6], 100, 435, 105, 115);
			}
		} else if (pl.enrageAnimation === 1) {
			var combatOffset = 5;
			pl.attackMotion++;
			var frameLength = 8;
			if (pl.attackMotion < frameLength) {
				ctx.drawImage(character[10], 100, 435, 105, 115);
				ctx.drawImage(heroImages[combatOffset + 1], 150, 465, 100, 80);
			} else if (pl.attackMotion < frameLength * 2) {
				ctx.drawImage(character[10], 100, 435, 105, 115);
				ctx.drawImage(heroImages[combatOffset + 2], 150, 465, 100, 80);
			} else if (pl.attackMotion < frameLength * 3) {
				ctx.drawImage(character[10], 100, 435, 105, 115);
				ctx.drawImage(heroImages[combatOffset + 3], 150, 465, 100, 80);
			} else {
				pl.enrageAnimation = 0;
				ctx.drawImage(character[6], 100, 435, 105, 115);
			}
		} else if (pl.viperAnimation === 1) {
			var combatOffset = 4;
			pl.attackMotion++;
			var frameLength = 15;
			if (pl.attackMotion < frameLength) {
				if (pl.attackMotion < (frameLength / 2)) {
					ctx.drawImage(character[10], 100, 435, 105, 115);
				} else {
					ctx.drawImage(character[6], 100, 435, 105, 115);
				}
				ctx.drawImage(heroImages[12], 120 + pl.attackMotion * 20, 360 - pl.attackMotion * 20, 80, 80);
			} else {
				pl.viperAnimation = 0;
				ctx.drawImage(character[6], 100, 435, 105, 115);
			}
		} else {
			ctx.drawImage(character[6], 100, 435, 105, 115);
		}
		
		//draw hamper, crush, or seek bounty
		if (pl.hamperAnimation === 1) {
			pl.otherMotion++;
			var frameLength = 15;
			if (pl.otherMotion < frameLength) {
				ctx.drawImage(heroImages[9], 320 + pl.otherMotion * 10, 80, 80, 80);
			} else {
				pl.hamperAnimation = 0;
			}
		} else if (pl.crushAnimation === 1) {
			pl.otherMotion++;
			var frameLength = 8;
			if (pl.otherMotion < frameLength) {
				pl.yChange++;
			} else if (pl.otherMotion < frameLength * 2) {
				pl.yChange--;
			} else if (pl.otherMotion < frameLength * 3) {
				pl.yChange++;
			} else if (pl.otherMotion < frameLength * 4) {
				pl.yChange--;
			} else {
				pl.crushAnimation = 0;
			}
			ctx.drawImage(heroImages[10], 360, 80 - pl.yChange, 25, 25);
			ctx.drawImage(heroImages[10], 400, 50 - pl.yChange, 25, 25);
			ctx.drawImage(heroImages[10], 440, 80 - pl.yChange, 25, 25);
		} else if (pl.bountyAnimation === 1) {
			pl.otherMotion++;
			var frameLength = 15;
			if (pl.otherMotion < frameLength) {
				pl.xChange++;
			} else if (pl.otherMotion < frameLength * 2) {
				pl.xChange--;
			} else if (pl.otherMotion < frameLength * 3) {
				pl.xChange++;
			} else if (pl.otherMotion < frameLength * 4) {
				pl.xChange--;
			} else {
				pl.bountyAnimation = 0;
			}
			ctx.drawImage(heroImages[14], 370 + pl.xChange, 60, 120, 180);	
			if (target.type === "Skeleton") {
				ctx.drawImage(skeleton[1], 413 + pl.xChange, 110, 40, 55);
			}
		}
		
		//draw border bars
		ctx.fillStyle = "#C0C0C0";
		ctx.fillRect(10, 10, 580, 30);
		ctx.fillRect(10, 560, 580, 30);
		
		//draw player health bar
		ctx.fillStyle = "black";
		ctx.fillRect(15, 565, 270, 20);
		ctx.fillStyle = "red";
		ctx.fillRect(15, 565, (pl.hp / 100) * 270, 20);
		
		//draw enemy health bar
		ctx.fillStyle = "black";
		ctx.fillRect(315, 15, 270, 20);
		ctx.fillStyle = "red";
		ctx.fillRect(315, 15, (target.hp / target.starthp) * 270, 20);
		
		//draw enemy name
		ctx.drawImage(basicImage[1], 358, 265, 170, 30);
		ctx.fillStyle = "silver";
		ctx.font = "20px Lucida Console";
		var xPixelOffset = 0;
		if (target.type === "Skeleton") {
			xPixelOffset = 22;
		}
		ctx.fillText(target.type, 374 + xPixelOffset, 286);
		
		//draw hitpoints
		ctx.font = "18px Consolas";
		ctx.fillStyle = "white";
		ctx.fillText("HP: " + target.hp, 330, 31);
		ctx.fillText("HP: " + pl.hp, 30, 581);
		
		//draw ability window
		ctx.fillStyle = "#C0C0C0";
		ctx.fillRect(285, 400, 305, 190);
		ctx.fillStyle = "black";
		ctx.fillRect(290, 405, 295, 180);
		
		//fill ability window
		ctx.fillStyle = "white";
		ctx.font = "18px Consolas";
		ctx.fillText("(A)ttack", 300, 430);
		ctx.drawImage(combatItems[4], 385, 413, 25, 24);
		ctx.fillText("(P)otion   " + pl.potions + "", 425, 430);
		ctx.drawImage(combatItems[0], 508, 414, 30, 19);
		if(pl.rampage === 0) {
			ctx.fillStyle = "grey";
		}
		ctx.fillText("(R)ampage", 300, 470);
		ctx.drawImage(heroImages[4], 392, 453, 25, 25);
		ctx.fillStyle = "white";
		if(pl.hamper === 0) {
			ctx.fillStyle = "grey";
		}
		ctx.fillText("(H)amper", 300, 510);
		ctx.drawImage(heroImages[9], 380, 490, 30, 28);
		ctx.fillStyle = "white";
		if(pl.viperStrike === 0) {
			ctx.fillStyle = "grey";
		}
		ctx.fillText("(V)iper", 300, 550);
		ctx.fillText(" Strike", 300, 570);
		ctx.drawImage(heroImages[12], 366, 533, 36, 45);
		ctx.fillStyle = "white";
		if(pl.offenseAbility[9] === 0) {
			ctx.fillStyle = "grey";
		}
		ctx.fillText("(E)nrage", 425, 470);
		ctx.drawImage(heroImages[5], 508, 452, 23, 23);
		ctx.fillStyle = "white";
		if(pl.defenseAbility[9] === 0) {
			ctx.fillStyle = "grey";
		}
		ctx.fillText("(C)rush", 425, 510);
		ctx.drawImage(heroImages[11], 495, 492, 26, 22);
		ctx.fillStyle = "white";
		if(pl.utilityAbility[9] === 0) {
			ctx.fillStyle = "grey";
		}
		ctx.fillText("(S)eek Bounty", 425, 550);
		ctx.drawImage(heroImages[15], 555, 536, 28, 18);
		ctx.fillStyle = "black";
		ctx.font = "8px Consolas";
		ctx.fillText("WANTED", 556, 544);
		//ability error
		ctx.font = "18px Consolas";
		ctx.fillStyle = "red";
		ctx.fillText(abilityError, 300, 380);
		
		//player damage taken
		if(pl.hitsTaken > 0) {
			for(var i = 0; i < pl.hitsTaken; i++) {
				if(pl.damageTaken[i] === 0) {
					ctx.fillStyle = "blue";
				}
				else {
					ctx.fillStyle = "red";
				}
				ctx.fillText("-" + pl.damageTaken[i], 70, 550 - 20 * i);
			}
		}
		
		//player healed
		ctx.fillStyle = "green";
		if(pl.healed > 0) {
			ctx.fillText("+" + pl.healed, 70, 550);
		}
		
		//target damage taken
		if(target.hitsTaken > 0) {
			for(var i = 0; i < target.hitsTaken; i++) {
				if(target.damageTaken[i] === 0) {
					ctx.fillStyle = "blue";
				}
				else {
					ctx.fillStyle = "red";
				}
				ctx.fillText("-" + target.damageTaken[i], 530, 60 + 20 * i);
			}
		}
		
		//target poison damage taken
		ctx.fillStyle = "green";
		if(target.poisonHitsTaken > 0) {
			for(var i = 0; i < target.poisonHitsTaken; i++) {
				ctx.fillText("-" + target.poisonDamageTaken[i], 490, 60 + 20 * i);
			}
		}
		
		//target poison stacks
		ctx.fillStyle = "green";
		if(target.poison > 0) {
			ctx.fillText("Poison: " + target.poison, 370, 60);
		}
		
		//fill debug info
		ctx.fillStyle = "black";
		ctx.font = "20px Consolas";
		ctx.fillText("Player entropy: " + pl.speedEntropy, 10, 70);
		ctx.fillText("Player turn storage: " + pl.turnStorage, 10, 90);
		ctx.fillText("target entropy: " + target.speedEntropy, 10, 110);
		ctx.fillText("target turn storage " + target.turnStorage, 10, 130);
	}
	else {
		for(var i = 0; i < mainHall.length; i++) {
			mainHall[i].update();
		}
		for(var i = 0; i < numHalls; i++) {
			tempHall = sideHalls[i];
			for(var j = 0; j < tempHall.length; j++) {
				tempHall[j].update();
			}
		}
		for(var i = 0; i < numEnemies; i++) {
			enemies[i].update();
		}
		start.update();
		pl.update();
		
		//draw dungeon level
		ctx = gameArea.context;
		ctx.font = "20px Consolas";
		ctx.fillStyle = "white";
		ctx.fillText("Dungeon Level: " + dungeonLevel, 15, 30);
		
		//draw gold
		ctx = gameArea.context;
		ctx.font = "20px Consolas";
		ctx.fillStyle = "white";
		ctx.fillText("Gold:   " + gold, 15, 50);
		ctx.drawImage(basicImage[3], 74, 34, 30, 18);
		
		//draw new point notification
		ctx.fillStyle = "white";
		if(displayNewPoint === 1) {
			ctx.fillText("New Hero Ability Point!", 240, 30);
		}
		
		//draw control information
		ctx.fillText("(H)ero Abilities", 30, 580);
		ctx.drawImage(basicImage[2], 8, 563, 22, 30);
		ctx.fillText("(S)hop", 30, 560);
		ctx.drawImage(basicImage[4], 10, 546, 22, 17);
		ctx.fillText("(K)High Scores", 440, 580);
		ctx.drawImage(basicImage[4], 10, 546, 22, 17);
	}
}

function generateRoom() {
	numEnemies = 0;
	enemies = [];

	//vertical or horiz
	isVertical = Math.floor(Math.random() * 2);
	
	mainHall = [];
	
	//generate main hall length
	var len = Math.floor(Math.random() * 5) + 4;
	
	//generate main hallway
	if(isVertical === 0) {
		for(var i = 0; i < len; i++) {
			mainHall.push(new floorTile(300 - TILE_SPACE/2 * len + TILE_SPACE * i, 300));
		}
	}
	else {
		for(var i = 0; i < len; i++) {
			mainHall.push(new floorTile(300, 300 - TILE_SPACE/2 * len + TILE_SPACE * i));
		}
	}
	
	//interconnect main hallway
	for(var i = 0; i < len - 1; i++) {
		if(isVertical === 1) {
			mainHall[i]._down = mainHall[i + 1];
			mainHall[i + 1]._up = mainHall[i];
		}
		else {
			mainHall[i]._right = mainHall[i + 1];
			mainHall[i + 1]._left = mainHall[i];
		}
		var enemyRand = Math.floor(Math.random() * 100);
		if(enemyRand < 20) {
			var e = new enemy(mainHall[i].x, mainHall[i].y);
			enemies.push(e);
			numEnemies = numEnemies + 1;
			mainHall[i].containedEnemy = e;
		}
	}
	
	//generate starting position on main hall
	//intraconnect main hall to starting position
	var freeEdge = new Array(len * 2 + 2);
	for(var i = 0; i < len * 2 + 2; i++) {
		freeEdge[i] = 1;
	}
	var startPos = Math.floor(Math.random() * (len * 2 + 2));
	if(startPos >= len) {
		startPos = startPos - len;
		if(startPos >= len) {
			//end point not edge
			startPos = startPos - len;
			freeEdge[startPos + 2*len] = 0;
			if(startPos === 0) {
				//left or bottom end
				if(isVertical === 1) {
					//top end
					
					start = new startTile(mainHall[0].x, mainHall[0].y - TILE_SPACE);
					start._down = mainHall[0];
					mainHall[0]._up = start;
				}
				else {
					//left end
					
					start = new startTile(mainHall[0].x - TILE_SPACE, mainHall[0].y);
					start._right = mainHall[0];
					mainHall[0]._left = start;
				}
			}
			else {
				//right or top end
				
				if(isVertical === 1) {
					//bottom end
					
					start = new startTile(mainHall[len - 1].x, mainHall[len - 1].y + TILE_SPACE);
					start._up = mainHall[len - 1];
					mainHall[len - 1]._down = start;
				}
				else {
					//right end
					
					start = new startTile(mainHall[len - 1].x + TILE_SPACE, mainHall[len - 1].y);
					start._left = mainHall[len - 1];
					mainHall[len - 1]._right = start;
				}
			}
		}
		else {
			//right or top edge
			if(isVertical === 1) {
				//right edge
				
				start = new startTile(mainHall[startPos].x + TILE_SPACE, mainHall[startPos].y);
				start._left = mainHall[startPos];
				mainHall[startPos]._right = start;
			}
			else {
				//top edge
				
				start = new startTile(mainHall[startPos].x, mainHall[startPos].y - TILE_SPACE);
				start._down = mainHall[startPos];
				mainHall[startPos]._up = start;
			}
			
			freeEdge[startPos + len] = 0;
			
			if(startPos === 0) {
				freeEdge[startPos + 1 + len] = 0;
			}
			else if(startPos === len - 1) {
				freeEdge[startPos - 1 + len] = 0;
			}
			else {
				freeEdge[startPos + 1 + len] = 0;
				freeEdge[startPos - 1 + len] = 0;
			}
		}
	}
	else {
		//left or bottom edge
		if(isVertical === 1) {
			//left edge
			
			start = new startTile(mainHall[startPos].x - TILE_SPACE, mainHall[startPos].y);
			start._right = mainHall[startPos];
			mainHall[startPos]._left = start;
		}
		else {
			//bottom edge
			
			start = new startTile(mainHall[startPos].x, mainHall[startPos].y + TILE_SPACE);
			start._up = mainHall[startPos];
			mainHall[startPos]._down = start;
		}
		
		freeEdge[startPos] = 0;
			
		if(startPos === 0) {
			freeEdge[startPos + 1] = 0;
		}
		else if(startPos === len - 1) {
			freeEdge[startPos - 1] = 0;
		}
		else {
			freeEdge[startPos + 1] = 0;
			freeEdge[startPos - 1] = 0;
		}
	}
	
	//reposition player
	pl.x = start.x;
	pl.y = start.y;
	pl.pos = start;
	
	//create side hallways
	//interconnect side hallways
	//intraconnect side hallways to main hallway
	numHalls = 0;
	noEnd = 1;
	sideHalls = [];
	while (numHalls < 3) {
		for(var i = 0; i < len * 2; i++) {
			//for each freeEdge excluding ends
			var rand = Math.floor(Math.random() * 100);
			if(freeEdge[i] === 1 && rand < 25) {
				//if edge is free and 25% chance pass
				
				//create hallway
				temp = [];
				//rand is temp hallway's length
				rand = Math.floor(Math.random() * 3) + 3;
				for(var j = 0; j < rand; j++) {
					//create floor tiles for each hallway
					var hallPos = i;
					if( i >= len ) {
						hallPos = i - len;
					}
					if(isVertical === 1) {
						if(i >= len) {
							//right edge
							temp.push(new floorTile(mainHall[hallPos].x + TILE_SPACE * (j + 1), mainHall[hallPos].y));
							if(j !== 0) {
								temp[j]._left = temp[j - 1];
								temp[j - 1]._right = temp[j];
							}
							else {
								temp[j]._left = mainHall[hallPos];
								mainHall[hallPos]._right = temp[j];
							}
						}
						else {
							//left edge
							temp.push(new floorTile(mainHall[hallPos].x - TILE_SPACE * (j + 1), mainHall[hallPos].y));
							if(j !== 0) {
								temp[j]._right = temp[j - 1];
								temp[j - 1]._left = temp[j];
							}
							else {
								temp[j]._right = mainHall[hallPos];
								mainHall[hallPos]._left = temp[j];
							}
						}
						
						//handle end creation
						if (j + 1 === rand && noEnd === 1) {
							//temp[j].width = 50;
							temp[j].isEnd = 1;
							noEnd = 0;
						}
						else {
							var enemyRand = Math.floor(Math.random() * 100);
							if(enemyRand < 40) {
								e = new enemy(temp[j].x, temp[j].y);
								enemies.push(e);
								numEnemies = numEnemies + 1;
								temp[j].containedEnemy = e;
							}
						}
					}
					else {
						if(i >= len) {
							//top edge
							temp.push(new floorTile(mainHall[hallPos].x, mainHall[hallPos].y - TILE_SPACE * (j + 1)));
							if(j !== 0) {
								temp[j]._down = temp[j - 1];
								temp[j - 1]._up = temp[j];
							}
							else {
								temp[j]._down = mainHall[hallPos];
								mainHall[hallPos]._up = temp[j];
							}
						}
						else {
							//bottom edge
							temp.push(new floorTile(mainHall[hallPos].x, mainHall[hallPos].y + TILE_SPACE * (j + 1)));
							if(j !== 0) {
								temp[j]._up = temp[j - 1];
								temp[j - 1]._down = temp[j];
							}
							else {
								temp[j]._up = mainHall[hallPos];
								mainHall[hallPos]._down = temp[j];
							}
						}
						
						//handle end creation
						if (j + 1 === rand && noEnd === 1) {
							//temp[j].width = 50;
							temp[j].isEnd = 1;
							noEnd = 0;
						}
						else {
							var enemyRand = Math.floor(Math.random() * 100);
							if(enemyRand < 40) {
								e = new enemy(temp[j].x, temp[j].y);
								enemies.push(e);
								numEnemies = numEnemies + 1;
								temp[j].containedEnemy = e;
							}
						}
					}
				
					if(i === 0) {
						freeEdge[0] = 0;
						freeEdge[1] = 0;
					}
					else if(i === len - 1) {
						freeEdge[len - 1] = 0;
						freeEdge[len - 2] = 0;
					}
					else if(i === len) {
						freeEdge[len] = 0;
						freeEdge[len + 1] = 0;
					}
					else if(i === 2*len - 1) {
						freeEdge[2*len - 1] = 0;
						freeEdge[2*len - 2] = 0;
					}
					else {
						freeEdge[i] = 0;
						freeEdge[i + 1] = 0;
						freeEdge[i - 1] = 0;
					}				
				}
				
				sideHalls.push(temp);
				
				numHalls++;
			}
		}
	}
	
	//create end tile
	//end = new endTile(0, 0);
}

function combatHandle() {
	if(pl.hp < 1) {
		//game over
		//free to adjust scoring system
		score = score + 100 * dungeonLevel;
		score = score + 100 * pl.weaponRank;
		score = score + 100 * pl.armorRank;
		score = score + 100 * pl.potionRank;
		score = score + 100 * pl.speedRank;
		score = score + 50 * pl.potions;
		gameOver = 1;
	}
	if(target.hp < 1) {
		combatActive = 0;
		if(target.alive === 1) {
			target.alive = 0;
			gold = gold + Math.floor(100 * pl.bonusGold) + 200 * target.isBounty;
			score = score + 100;
		}
	}
	if(pl.turnStorage > 0) {
		playerTurn();
	}
	else if(target.turnStorage > 0) {
		targetTurn();
	}
	else {
		var updated = 0;
		while(pl.turnStorage === 0 && target.turnStorage === 0) {
			pl.speedEntropy = Math.floor((pl.speedEntropy + pl.speed) * pl.bonusSpeed);
			target.speedEntropy = target.speedEntropy + target.speed;
			while(pl.speedEntropy >= 100) {
				pl.speedEntropy = pl.speedEntropy - 100;
				pl.turnStorage = pl.turnStorage + 1;
			}
			while(target.speedEntropy >= 100) {
				target.speedEntropy = target.speedEntropy - 100;
				target.turnStorage = target.turnStorage + 1;
			}
			updated = updated + 1;
		}
		if(updated != 0) {
			combatHandle();
		}
	}
}

function playerTurn() {
	awaitingInput = 1;
}

function targetTurn() {
	target.turnStorage = target.turnStorage - 1;
	
	if(target.poison > 0) {
		target.hp = target.hp - target.poison;
		target.poisonDamageTaken[target.poisonHitsTaken] = target.poison;
		target.poisonHitsTaken = target.poisonHitsTaken + 1;
		target.poison = target.poison - 1;
	}
	
	if(target.hp > 0) {
		target.renderAttackImage = 1;
		target.renderAttackImageStance = 0;
		target.stanceUp = 1;
		var armorReduction = Math.floor((pl.armor + pl.armorRank) * pl.bonusArmor);
		var damageDealt = Math.floor((Math.random() * target.damageRange) * (1 + 0.2 * pl.isEnraged)) + target.baseDamage - armorReduction;
		if(damageDealt < 0) {
			damageDealt = 0;
		}
		pl.hp = pl.hp - damageDealt;
		pl.damageTaken[pl.hitsTaken] = damageDealt;
		pl.hitsTaken = pl.hitsTaken + 1;
	}
	combatHandle();

}

window.onkeyup = function(e) {
	//read user inputs continuously
	//move player through map based on key inputs
	//ignore additional keys
	
	var key = e.keyCode ? e.keyCode : e.which;
	
	if(scoreboardActive === 1) {
		if(key === 75) {
			scoreboardActive = 0;
		}
		else if(key === 40) {
			//up
			if(scoreOffset < 2) {
				scoreOffset = scoreOffset + 1;
			}
		}
		else if(key === 38) {
			//down
			if(scoreOffset > 0) {
				scoreOffset = scoreOffset - 1;
			}
		}
	}
	else if(gameOver === 1) {
		//block all inputs
		if(sentHighScores === 0) {
			if(key === 8) {
				pl.name = pl.name.substring(0, pl.name.length - 1);
			}
			else if(key === 13) {
				//SEND RESULTS AND PREVENT MULTIPLE SENDS
				if (pl.name === "") {
					pl.name = "troll";
				}
				getOutput();
				sentHighScores = 1;
				gameOver = 0;
				getOutput();
				gameOver = 1;
				scoreboardActive = 1;
				
			}
			else if(key === 17 || key === 18 || key === 16 || key === 9 || key === 220 || key === 187 || key === 189 || key === 32 || key === 20 || key === 27 || key === 112 || key === 113 || key === 114 || key === 115 || key === 116 || key === 117 || key === 118 || key === 119 || key === 120 || key === 121 || key === 122 || key === 123 || key === 45 || 
				key === 46 || key === 188 || key === 190 || key === 191 || key === 186 || key === 222 || key === 219 || key === 221 || key === 38 || key === 40 || key === 37 || key === 39 || key === 45 || key === 19) {
				//block inputs from adding chars
				//stops shift, ctrl, alt, tab, function keys, esc, and special chars
			}
			else {
				pl.name = pl.name + String.fromCharCode(key);
			}
		}
		else {
			if(key === 75) {
				gameOver = 0;
				getOutput();
				gameOver = 1;
				scoreboardActive = 1;
			}
		}
	}
	else if(abilitiesActive === 1) {
		if(key === 72) {
			abilitiesActive = 0;
			abilityError = "";
		}
		else if (key === 79) {
			//offense
			abilitySelected = 0;
			columnSelected = "null";
			abilityError = "";
		}
		else if (key === 68) {
			//defense
			abilitySelected = 1;
			columnSelected = "null";
			abilityError = "";
		}
		else if (key === 85) {
			//utility
			abilitySelected = 2;
			columnSelected = "null";
			abilityError = "";
		}
		else if (key === 49 && abilitySelected !== "null") {
			//column 1
			columnSelected = 0;
			abilityError = "";
		}
		else if (key === 50 && abilitySelected !== "null") {
			//column 2
			columnSelected = 1;
			abilityError = "";
		}
		else if (key === 51 && abilitySelected !== "null") {
			//column 3
			columnSelected = 2;
			abilityError = "";
		}
		else if (key === 65) {
			if(pl.abilityPoints < 1) {
				//insufficient points
				abilityError = "Insufficient ability points.";
			}
			else if((abilitySelected === 0 && pl.offenseTier === 4) || (abilitySelected === 1 && pl.defenseTier === 4) || (abilitySelected === 2 && pl.utilityTier === 4)) {
				//max rank in ability
				abilityError = "Max rank in ability.";
			}
			else if (abilitySelected !== "null" && columnSelected !== "null") {
				if(abilitySelected === 0) {
					//offense ability unlocked
					if(pl.offenseTier < 3) {
						//not ult
						if(columnSelected === 0) {
							//wrath
							pl.bonusDamage = pl.bonusDamage + .2;
						}
						else if(columnSelected === 1) {
							//rampage
							pl.rampage = pl.rampage + 1;
						}
						else {
							//sunder
							pl.armorPen = pl.armorPen + 2;
						}
					pl.offenseAbility[columnSelected + 3 * pl.offenseTier] = 1;
					}
					else {
						//enrage
						pl.offenseAbility[9] = 1;
					}
					pl.offenseTier = pl.offenseTier + 1;
				}
				else if(abilitySelected === 1) {
					//defense ability unlocked
					if(pl.defenseTier < 3) {
						//not ult
						if(columnSelected === 0) {
							//barrier
							pl.bonusArmor = pl.bonusArmor + .2;
						}
						else if(columnSelected === 1) {
							//hamper
							pl.hamper = pl.hamper + 1;
						}
						else {
							//regeneration
							pl.regen = pl.regen + 2;
						}
					pl.defenseAbility[columnSelected + 3 * pl.defenseTier] = 1;
					}
					else {
						//crush
						pl.defenseAbility[9] = 1;
					}
					pl.defenseTier = pl.defenseTier + 1;
				}
				else {
					//utility ability unlocked
					if(pl.utilityTier < 3) {
						//not ult
						if(columnSelected === 0) {
							//midas touch
							pl.bonusGold = pl.bonusGold + .2;
						}
						else if(columnSelected === 1) {
							//viper strike
							pl.viperStrike = pl.viperStrike + 1;
						}
						else {
							//quickness
							pl.bonusSpeed = pl.bonusSpeed + .2;
						}
					pl.utilityAbility[columnSelected + 3 * pl.utilityTier] = 1;
					}
					else {
						//seek bounty
						pl.utilityAbility[9] = 1;
					}
					pl.utilityTier = pl.utilityTier + 1;
				}
				pl.abilityPoints = pl.abilityPoints - 1;
				abilityError = "";
			}
		}
	}
	else if(shopActive === 1) {
		if(key === 83) {
			shopActive = 0;
		}
		if(key === 87) {
			//upgrade (W)eapon
			if(gold >= pl.weaponCost) {
				gold = gold - pl.weaponCost;
				pl.weaponRank = pl.weaponRank + 1;
				pl.weaponCost = Math.floor(pl.weaponCost * pl.priceScale);
			}
		}
		if(key === 65) {
			//upgrade (A)rmor
			if(gold >= pl.armorCost) {
				gold = gold - pl.armorCost;
				pl.armorRank = pl.armorRank + 1;
				pl.armorCost = Math.floor(pl.armorCost * pl.priceScale);
			}
		}
		if(key === 80) {
			//buy (P)otions
			if(gold >= pl.potionCost) {
				gold = gold - pl.potionCost;
				pl.potions = pl.potions + 1;
			}
		}
		if(key === 79) {
			//upgrade p(o)tion
			if(gold >= pl.potionUpgradeCost) {
				gold = gold - pl.potionUpgradeCost;
				pl.potionRank = pl.potionRank + 1;
				pl.potionUpgradeCost = Math.floor(pl.potionUpgradeCost * pl.priceScale);
			}
		}
		if(key === 69) {
			//upgrade sp(e)ed
			if(gold >= pl.speedCost) {
				gold = gold - pl.speedCost;
				pl.speed = pl.speed + 5;
				pl.speedRank = pl.speedRank + 1;
				pl.speedCost = Math.floor(pl.speedCost * pl.priceScale);
			}
		}
	}
	else if(combatActive === 1) {
		if(awaitingInput === 1) {
			pl.damageTaken = [];
			pl.hitsTaken = 0;
			target.hitsTaken = 0;
			target.poisonHitsTaken = 0;
			target.poisonDamageTaken = [];
			abilityError = "";
			pl.healed = 0;
			//read input
			//handle input
			if(key === 65) {
				//attack (A)
				awaitingInput = 0;
				pl.attacking = 1;
				pl.attackMotion = 0;
				var armorReduction = target.armor - pl.armorPen;
				if(pl.armorPen > target.armor) {
					armorReduction = 0;
				}
				
				var damageDealt = Math.floor((Math.random() * (pl.damageRange + pl.weaponRank) + pl.baseDamage + pl.weaponRank) * (pl.bonusDamage + 0.3 * pl.isEnraged)) - armorReduction;
				if(damageDealt < 0) {
					damageDealt = 0;
				}
				target.hp = target.hp - damageDealt;
				target.damageTaken[target.hitsTaken] = damageDealt;
				target.hitsTaken = target.hitsTaken + 1;
				pl.turnStorage = pl.turnStorage - 1;
				
				pl.hp = pl.hp + pl.regen;
				if(pl.hp > 100) {
					pl.hp = 100;
				}

				combatHandle();
			}
			else if(key === 80) {
				//potion (P)
				if(pl.potions > 0) {
					//pl.turnStorage = pl.turnStorage - 1;
					awaitingInput = 0;
					pl.potions = pl.potions - 1;
					pl.drinkingPotion = 1;
					pl.potionMotion = 0;
					var amtHeal = Math.floor(Math.random() * (25 + 5 * pl.potionRank)) + 25;
					if(amtHeal > 0) {
						pl.healed = amtHeal;
					}
					pl.hp = pl.hp + amtHeal;
					pl.hp = pl.hp + pl.regen;
					if(pl.hp > 100) {
						pl.hp = 100;
					}
					
					combatHandle();
				}
			}
			else if (key === 82) {
				//rampage
				if(pl.rampage > 0) {
					awaitingInput = 0;
					pl.rampageAttack = 1;
					pl.attackMotion = 0;
					var armorReduction = target.armor = pl.armorPen;
					if(pl.armorPen > target.armor) {
						armorReduction = 0;
					}
					var damageDealt = Math.floor((Math.random() * (pl.damageRange + pl.weaponRank + 5 * pl.rampage) + pl.baseDamage + pl.weaponRank + 5 * pl.rampage) * (pl.bonusDamage + 0.3 * pl.isEnraged)) - armorReduction;
					if(damageDealt < 0) {
						damageDealt = 0;
					}
					target.hp = target.hp - damageDealt;
					target.damageTaken[target.hitsTaken] = damageDealt;
					target.hitsTaken = target.hitsTaken + 1;
					pl.turnStorage = pl.turnStorage - 1;
					
					pl.hp = pl.hp + pl.regen;
					if(pl.hp > 100) {
						pl.hp = 100;
					}
					
					combatHandle();
				}
				else {
					abilityError = "Ability is not unlocked.";
				}
			}
			else if(key === 72) {
				//hamper
				if(pl.hamper > 0) {
					awaitingInput = 0;
					pl.hamperAnimation = 1;
					pl.otherMotion = 0;
					var armorReduction = target.armor - pl.armorPen;
					if(pl.armorPen > target.armor) {
						armorReduction = 0;
					}
				
					var damageDealt = Math.floor((Math.random() * (pl.damageRange + pl.weaponRank) + pl.baseDamage + pl.weaponRank) * (pl.bonusDamage + 0.3 * pl.isEnraged)) - armorReduction;
					if(damageDealt < 0) {
						damageDealt = 0;
					}
					target.hp = target.hp - damageDealt;
					target.damageTaken[target.hitsTaken] = damageDealt;
					target.hitsTaken = target.hitsTaken + 1;
					
					target.speedEntropy = target.speedEntropy - 20 * pl.hamper;
					if(target.speedEntropy < 0) {
						target.speedEntropy = 0;
					}
					
					pl.turnStorage = pl.turnStorage - 1;
				
					pl.hp = pl.hp + pl.regen;
					if(pl.hp > 100) {
						pl.hp = 100;
					}
					
					combatHandle();
				}
				else {
					abilityError = "Ability is not unlocked.";
				}
			}
			else if(key === 86) {
				//viper strike
				if(pl.viperStrike > 0) {
					awaitingInput = 0;
					pl.viperAnimation = 1;
					pl.attackMotion = 0;
					var armorReduction = target.armor - pl.armorPen;
					if(pl.armorPen > target.armor) {
						armorReduction = 0;
					}
					
					var damageDealt = Math.floor((Math.random() * (pl.damageRange + pl.weaponRank - 2 * pl.viperStrike) + pl.baseDamage + pl.weaponRank - 2 * pl.viperStrike) * (pl.bonusDamage + 0.3 * pl.isEnraged)) - armorReduction;
					if(damageDealt < 0) {
						damageDealt = 0;
					}
					else if(damageDealt > 0) {
						target.poison = target.poison + 2 * pl.viperStrike;
					}
					target.hp = target.hp - damageDealt;
					target.damageTaken[target.hitsTaken] = damageDealt;
					target.hitsTaken = target.hitsTaken + 1;
					pl.turnStorage = pl.turnStorage - 1;
					
					pl.hp = pl.hp + pl.regen;
					if(pl.hp > 100) {
						pl.hp = 100;
					}
					
					combatHandle();
				}
				else {
					abilityError = "Ability is not unlocked.";
				}
			}
			else if(key === 69) {
				//enrage
				if(pl.offenseAbility[9] === 1 && pl.canEnrage === 1) {
					pl.canEnrage = 0;
					awaitingInput = 0;
					pl.enrageAnimation = 1;
					pl.attackMotion = 0;
					pl.isEnraged = 1;
					pl.turnStorage = pl.turnStorage + 1;
					combatHandle();
				}
				else {
					if(pl.canEnrage === 0) {
						abilityError = "Ability is not ready yet.";
					}
					else {
						abilityError = "Ability is not unlocked.";
					}
				}
			}
			else if(key === 67) {
				//crush
				if(pl.defenseAbility[9] === 1 && pl.canCrush === 1) {
					pl.canCrush = 0;
					awaitingInput = 0;
					pl.crushAnimation = 1;
					pl.otherMotion = 0;
					pl.yChange = 0;
					var armorReduction = target.armor - pl.armorPen;
					if(pl.armorPen > target.armor) {
						armorReduction = 0;
					}
					
					var damageDealt = Math.floor((Math.random() * (pl.damageRange + pl.weaponRank) + pl.baseDamage + pl.weaponRank) * (pl.bonusDamage + 0.3 * pl.isEnraged)) - armorReduction;
					if(damageDealt < 0) {
						damageDealt = 0;
					}
					target.hp = target.hp - damageDealt;
					target.damageTaken[target.hitsTaken] = damageDealt;
					target.hitsTaken = target.hitsTaken + 1;
					pl.turnStorage = pl.turnStorage - 1;
					
					pl.hp = pl.hp + pl.regen;
					if(pl.hp > 100) {
						pl.hp = 100;
					}
					
					target.speedEntropy = 0;
					target.turnStorage = 0;
					
					combatHandle();
				}
				else {
					if(pl.canCrush === 0) {
						abilityError = "Ability is not ready yet.";
					}
					else {
						abilityError = "Ability is not unlocked.";
					}
				}
			}
			else if(key === 83) {
				//seek bounty
				if(pl.utilityAbility[9] === 1 && pl.canSeek === 1) {
					pl.canSeek = 0;
					awaitingInput = 0;
					pl.bountyAnimation = 1;
					pl.otherMotion = 0;
					target.isBounty = 1;
					
					combatHandle();
				}
				else {
					if(pl.canSeek === 0) {
						abilityError = "Ability is not ready yet.";
					}
					else {
						abilityError = "Ability is not unlocked.";
					}
				}
			}
		}
	}
	else if (characterMoving !== 1) {
		displayNewPoint = 0;
		if(key === 38) {
			characterMoved = 1;
			characterDirection = "up";
			//move player up if exists
			//pl.y = pl.y - 10;
			if(pl.pos._up !== "null") {
				characterMoving = 1;
				pl.pos = pl.pos._up;
				pl.x = pl.pos.x;
				pl.y = pl.pos.y;
			}
			//check if on end tile

		}
		else if (key === 40) {
			characterMoved = 1;
			characterDirection = "down";
			//move player down if exists
			//pl.y = pl.y + 10;
			if(pl.pos._down !== "null") {
				characterMoving = 1;
				pl.pos = pl.pos._down;
				pl.x = pl.pos.x;
				pl.y = pl.pos.y;
			}

		}
		else if (key === 37) {
			characterMoved = 1;
			characterDirection = "left";
			//move player left if exists
			//pl.x = pl.x - 10;
			if(pl.pos._left !== "null") {
				characterMoving = 1;
				pl.pos = pl.pos._left;
				pl.x = pl.pos.x;
				pl.y = pl.pos.y;
			}

		}
		else if (key === 39) {
			characterMoved = 1;
			characterDirection = "right";
			//move player right if exists
			//pl.x = pl.x + 10;
			if(pl.pos._right !== "null") {
				characterMoving = 1;
				pl.pos = pl.pos._right;
				pl.x = pl.pos.x;
				pl.y = pl.pos.y;
			}

		}
		else if(key === 83) {
			//open shop window
			shopActive = 1;
		}
		else if(key === 72) {
			//open hero abilities
			abilitySelected = "null";
			columnSelected = "null";
			abilitiesActive = 1;
		}
		else if (key === 75) {
			//K
			//open leaderboard
			
			//currently testing protocol only
			
			//request info from scoreboard server
			getOutput();
			
			scoreboardActive = 1;
		}
		
		if(pl.pos.isEnd === 1) {
			startTileDirection = 0;
			characterDirection = 0;
			characterMoved = 0;
			characterMoving = 0;
			movingIndex = 0;
			generateRoom();
			dungeonLevel = dungeonLevel + 1;
			if(dungeonLevel % 2 === 1) {
				displayNewPoint = 1;
				pl.abilityPoints = pl.abilityPoints + 1;
			}
			//gold = gold + 100;
		}
		if(pl.pos.containedEnemy !== "null") {
			target = pl.pos.containedEnemy;
			if(target.hp > 0) {
				if(pl.turnStorage < 1) {
					pl.turnStorage = 1;
				}
				combatActive = 1;
				pl.canEnrage = 1;
				pl.canCrush = 1;
				pl.canSeek = 1;
				pl.attackMotion = 0;
			    pl.otherMotion = 0;
				pl.drinkingPotion = 0;
				pl.attacking = 0;
				pl.rampageAttack = 0;
				pl.enrageAnimation = 0;
				pl.hamperAnimation = 0;
				pl.crushAnimation = 0;
				pl.viperAnimation = 0;
				pl.bountyAnimation = 0;
				combatHandle();
			}
		}
	}
};

//AJAX functions
function getOutput() {
	getRequest(
		"ajax.php",
		drawOutput,
		drawError
	);
	return false;
}
	
function drawError() {
	//let user know error occurred when contacting high scores server
	//serverConnection = 0;
	ctx.fillStyle = "white";
	ctx.fillText("Waiting for server response...", 60, 250);
}
	
function drawOutput(responseText) {
	//draw output for high scores
	//serverConnection = 1;
	highScoresText = responseText;
	ctx.fillStyle = "white";
	//ctx.fillText("Server success!", 60, 250);
	//ctx.fillText(responseText, 100, 100);
	var entries = responseText.split("_");
	for(var i = 0; i < entries.length - 1; i++) {
		var row = entries[i].split(" ");
		ctx.fillText(row[0], 30, 80 + 30 * i - 500 * scoreOffset);
		ctx.fillText(row[1], 90 , 80 + 30 * i - 500 * scoreOffset);
		ctx.fillText(row[2], 300, 80 + 30 * i - 500 * scoreOffset);
		ctx.fillText(row[3], 500, 80 + 30 * i - 500 * scoreOffset);
	}
}
	
function getRequest(url, success, errorFunc) {
	//serverConnection = 1;
	var req = false;
	try {
		req = new XMLHttpRequest();
		//serverConnection = 1;
	} catch(e) {
		try {
			req = new ActiveXObject("Msxml2.XMLHTTP");
//			serverConnection = 1;
		} catch(e) {
			try {
				req = new ActiveXOBject("Microsoft.XMLHTTP");
//				serverConnection = 1;
			} catch(e) {
//				serverConnection = 1;
				return false;
			}
		}
	}
	
//	serverConnection = 1;
	if(!req) return false;
	if (typeof success != "function") success = function () {};
	if (typeof errorFunc != "function") errorFunc = function () {};
	req.onreadystatechange = function() {
		//if(req.readyState == 4) {
		//	return req.status === 200 ?
		//		success(req.responseText) : error(req.status);
		//}
		if(req.readyState === 4) {
			if(req.status === 200) {
				serverConnection = 1;
				success(req.responseText);
			}
			else {
				serverConnection = 0;
				errorFunc(req.status);
			}
		}
	};
	if(gameOver === 1) {
		req.open("GET", url + "?q=" + "send" + "&name=" + pl.name + "&score=" + score + "&floor=" + dungeonLevel, true);
	}
	else {
		req.open("GET", url + "?q=" + "score" + "&name=" + pl.name + "&score=" + score + "&floor=" + dungeonLevel, true);
	}
	req.send();
	return req;
}
