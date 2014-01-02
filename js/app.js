function GameOfLife() {

	var interval = null;

	GameOfLife.prototype.init = function(){
		$("#submit").click(function(){
			var rows = $('input[name=rows]').val();
			var columns = $('input[name=columns]').val();

			drawGrid(rows, columns);
		});
	}

	var drawGrid = function(rows, columns){
		$(".life").html("");
		clearInterval(interval);

		for(var r = 0; r < rows; r++){
			for(var c = 0; c < columns; c++){
				var cellId = r + "_" + c;
				$(".life").append("<div class='cell dead' cellid="+ cellId +"></div>")
			}
			$(".life").append("<div class='clear'></div>");
		}

		$('.cell').click(function(e) {
			clearInterval(interval);
			$(e.target).toggleClass('live');
			$(e.target).toggleClass('dead');
		});		

	};

	drawGrid(10, 10)
	$('input[name=rows]').val(10);
	$('input[name=columns]').val(10);


	var getAliveNeighboursCount = function(i, j, rows, columns){

		var aliveCount = 0;

		if ((i - 1 >= 0) && ( j - 1 >= 0)){
			cellId = (i - 1) + "_" + (j - 1);
			var cell = $("div[cellid="+cellId+"]");
			if ($(cell).hasClass("live")) {
				aliveCount += 1
			}
		}

		if ((i >= 0) && ( j - 1 >= 0)){
			cellId = i + "_" + (j - 1);
			var cell = $("div[cellid="+cellId+"]");
			if ($(cell).hasClass("live")) {
				aliveCount += 1
			}
		}		

		if ((i + 1 < rows) && ( j - 1 >= 0)){
			cellId = (i + 1) + "_" + (j - 1);
			var cell = $("div[cellid="+cellId+"]");
			if ($(cell).hasClass("live")) {
				aliveCount += 1
			}
		}	

		if ((i - 1 >= 0) && ( j >= 0)){
			cellId = (i - 1) + "_" + j;
			var cell = $("div[cellid="+cellId+"]");
			if ($(cell).hasClass("live")) {
				aliveCount += 1
			}
		}			

		if ((i + 1 < rows) && ( j >= 0)){
			cellId = (i + 1) + "_" + j;
			var cell = $("div[cellid="+cellId+"]");
			if ($(cell).hasClass("live")) {
				aliveCount += 1
			}
		}	

		if ((i - 1 >= 0) && ( j + 1  < columns)){
			cellId = (i - 1) + "_" + (j + 1);
			var cell = $("div[cellid="+cellId+"]");
			if ($(cell).hasClass("live")) {
				aliveCount += 1
			}
		}	

		if ((i >= 0) && ( j + 1  < columns)){
			cellId = i + "_" + (j + 1);
			var cell = $("div[cellid="+cellId+"]");
			if ($(cell).hasClass("live")) {
				aliveCount += 1
			}
		}

		if ((i + 1 < rows) && ( j + 1  < columns)) {
			cellId = (i +1) + "_" + (j +1);
			var cell = $("div[cellid="+cellId+"]");
			if ($(cell).hasClass("live")) {
				aliveCount += 1
			}
		}		

		return aliveCount;	

	};


	$(".runGameOfLife").click(function(){
		var rows = $('input[name=rows]').val();
		var columns = $('input[name=columns]').val();


		interval = setInterval(function(){
			for (var r = 0; r < rows; r++) {
				for (var c =0; c < columns; c++){
					var cellId = r + "_" + c;
					var cell = $("div[cellid="+cellId+"]");
					var currentCellState = $(cell).hasClass("live");

					var noOfAliveNeighhoursCount = getAliveNeighboursCount(r, c, rows, columns);


					if ((currentCellState === true) && (noOfAliveNeighhoursCount < 2 || noOfAliveNeighhoursCount > 3)) {
						$(cell).attr("nextState", "dead");
					}

					if ((currentCellState === true) && ((noOfAliveNeighhoursCount === 2) || (noOfAliveNeighhoursCount === 3))){
						$(cell).attr("nextState", "live");
					}

					if ((currentCellState === false) && (noOfAliveNeighhoursCount === 3)) {
						$(cell).attr("nextState", "live");
					}				

				}
			}


			for(var r = 0; r < rows; r++){
				for (var c =0; c < columns; c++){
					var cellId = r + "_" + c;
					var cell = $("div[cellid="+cellId+"]");

					var cellNextState = cell.attr("nextState")

					if (cellNextState === "live") {
						cell.addClass('live');
						cell.removeClass('dead');
					}

					if (cellNextState === "dead") {
						cell.addClass('dead');
						cell.removeClass('live');
					}

				}
			}


		},600);


});
}



$(function(){
	var gol = new GameOfLife();
	gol.init();
});