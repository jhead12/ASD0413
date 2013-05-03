function(doc){
if(doc._id.substr(0, 5) === "poem-"){
	emit(doc._id, {
	      "title": doc.title,
	      "poet": doc.poet,
	      "original_art": doc.original_art,
	      "original_music": doc.original_music,
	      "poem": doc.poem
	
	   });
	}

};