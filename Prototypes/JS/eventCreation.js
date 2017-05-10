function show(obj) {
			no = obj.options[obj.selectedIndex].value;
			count = obj.options.length;
			for(i=1;i<count;i++)
			document.getElementById('myDiv'+i).style.display = 'none';
			if(no>0)
			document.getElementById('myDiv'+no).style.display = 'block';
			}