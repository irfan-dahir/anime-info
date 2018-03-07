$(function() {
	$("#search_form").on('submit', function(e) {
		e.preventDefault();

		console.log("Searching");
		var text = $("#search_input").val();

		if (text.length == 0) {
			$("#notif").text("Empty")
			return;
		}

		if (/anime:(\s|)([0-9]{1,})/.test(text)) {
			var matches = text.match(/anime:(\s|)([0-9]{1,})/);
			var id = matches[2];

			$("#overlay_loading").show();
			$("#overlay_loading").css('display', 'grid');

			$.ajax({
				url: 'https://api.jikan.me/anime/'+id,
				success: function(data) {
					//let data = JSON.parse(json);
					$("#overlay_loading").hide();
					$("body").addClass('bodySearchBackground');
					$("#search_form").hide();

					$(".anime").show();
					$(".anime").css('display', 'grid');

					$(".anime h1").text(data.title);
					$(".anime .source").text("Source: " + data.source);
					$(".anime .score").text(data.score);
					$(".anime .rank").text("#"+data.rank);
					$(".anime .episodes span").text(data.episodes);
					$(".anime .rating").text(data.rating);
					$(".anime .img").attr("src", data.image_url);
					$(".anime .img").attr("alt", data.title);
					$(".anime p").html(data.synopsis).text();

					for(k in data.genre) {
						$(".anime .genre").append("<label>"+data.genre[k].name+"</label>")
					}

					for(k in data.studio) {
						$(".anime .studio span").append("<a href=\""+data.studio[k].url+"\">"+data.studio[k].name+"</a>")
					}

					$(".anime").addClass('fadeIn');
				}
			});
		}

	});
});