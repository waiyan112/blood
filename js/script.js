	$("#home").on('pageinit',function(){
		$("#bod").datepicker({changeMonth:true,changeYear:true,dateFormat:'yy-mm-dd',defaultDate:-8000});
		$("#last_donate").datepicker({changeMonth:true,changeYear:true,dateFormat:'yy-mm-dd'});
		$('#addbloodDonorForm').attr('action',base_url+'blood/addMobile');
	
		//for blood type
		$.getJSON('js/data/blood.json',function(data)
			{
				var d = '';
				for(var i = 0;i< data.length;i++){
				d +="<option value="+data[i]['blood_id']+">"+data[i]['blood_name']+"</option>";
				}
				$("#bloodgroup").html(d);
			});
		//for township
		$.getJSON('js/data/township.json',function(data)
			{
				var d = '';
				for(var i = 0;i< data.length;i++){
				d +="<option value="+data[i]['township_id']+">"+data[i]['township_name']+"</option>";
				}
				$("#township").html(d);
			});
			onload();
});
function onload(){

	document.addEventListener("deviceready", onDeviceReady, true);

}

function onDeviceReady()
{
			var networkState = navigator.connection.type;
	 if (networkState == Connection.NONE) 
		{
	
		$("#needblood1").html('<h1 align="center" color="pink">Internet Required</h1>');
		}else
		{
	var internet = 'yes';
	}
if(internet == 'yes')
{
needblood();
}else
{
setInterval(function() {
			var networkState = navigator.connection.type;
	 if (networkState == Connection.NONE) 
		{
		
		}else
		{
		needblood();
		}
}, 5000);
}


	
	// open database
	db = window.openDatabase("wsfewdfsefwe", "1.0", "Blood Donation Application", 1000000);	
	db.transaction(populateDB, errorCB, successCB);
	function populateDB(tx)
	{
		tx.executeSql('CREATE TABLE IF NOT EXISTS BLOG (id unique, blog_title,blog_des,file_name)');			
		tx.executeSql('INSERT INTO BLOG (id, blog_title,blog_des,file_name) VALUES ( ?,?,?,?)',['1','sample','sample','null']);
	}
	function errorCB(er)
	{
		//
	}
	function successCB(tx)
	{
	}


function needblood()
{
	$.ajax({
		url : base_url+'index.php/blood/need_blood',
		success : function(data)
		{  						
		var da = '	<div id="content">';
			for(var i = 0; i<data.length; i++)
			{		
			if(data[i]['status'] != 1)
			{
				da += "<p>";
			}else
			{			
			da += "<p class='statusok'>";
			}
				da += '<span>တည္ေနရာ - '+data[i]['township_name'];
				if(data[i]['status'] != 1)
				{
				da += '<img src="img/circle-heart.png" style="float:right;"/><br></span>';
				}else
				{
				da +='<img src="img/circle-heart-green.png" style="float:right;"/><br></span>';
				}
				da += '<span>ေသြးအမ်ိဳးအစား - '+data[i]['blood_name']+' <br></span>';
				da +='<span>လွဴရမည့္ေန႔ / အခ်ိန္ :'+data[i]['NB_time']+'('+data[i]['time_des2']+')</span><br/>';
				if(data[i]['status'] != 1)
				{
				da +='<span>အေျခအေန : အလွဴရွင္ မရေသးပါ။</span><br/>';
				var dataid = window.localStorage.getItem('NB_id'+data[i]['NB_id']);
				if(dataid == null)
				{
					da +='<a href="" id="'+data[i]['NB_id']+'"  data-NB_id="'+data[i]['NB_id']+'" data-blood_type="'+data[i]['blood_id']+'" class="iwilldonate" data-role="button" >လႈမယ္။ ဒီဖုန္းကို ေခၚေပးပါ။</a>';
				}
				else if(dataid == '1')
				{
					da += '<hr/><span> ဖုန္းေခၚဆိုမႈကို ေစာင့္ဆုိင္းေနဆဲ အဆင့္...........</span>';
				}
				else if(dataid == '2')
				{
					da += "<hr/><span>သင္လွဴ၍ မရႏုိင္ပါ။</span>"
				}
				}else
				{
				da +='<span>အေျခအေန : အလွဴရွင္ရသြားပါၿပီ။</span>';
				}
				da += '</p>';				
			}
			da += "</div><span>&nbsp;</span>";			
			$("#needblood1").html(da);
		}
	});
}

	db.transaction(queryDB);
	function queryDB(tx) 
	{
		tx.executeSql('SELECT * FROM BLOG', [], BLOG);
		tx.executeSql('SELECT * FROM donator', [], donator);
	}
	function donator(tx,results)
	{
		if(results.rows.length>0)
		{
			window.localStorage.setItem('userid',results.rows.item(0).id);
			window.localStorage.setItem('blood_type',results.rows.item(0).blood_type);
			window.localStorage.setItem('last_donate',results.rows.item(0).last_donate);
			window.localStorage.setItem('bod',results.rows.item(0).bod);
			$("#id").val(results.rows.item(0).id);
			$("#name").val(results.rows.item(0).name);
			$("#bod").val(results.rows.item(0).bod);
			$("#last_donate").val(results.rows.item(0).last_donate);
			$("#nrc").val(results.rows.item(0).nrc);			
			$("#bloodgroup").val(results.rows.item(0).blood_type);
			$("#phoneNumber").val(results.rows.item(0).phoneNumber);			
			$("#township").val(results.rows.item(0).township);			
			$(".sex").val(results.rows.item(0).sex);			
			$(".wantTravelCharge").val(results.rows.item(0).wantTravelCharge);			
			//$("body").pagecontainer("change", "#form");
		}
	}
	$(".editbutton").click(function(){
	db.transaction(function(tx)
	{
	tx.executeSql('SELECT * FROM donator', [], function(tx,results){
	if(results.rows.length == 1)
		{
			$("id").val(results.rows.item(0).id);	
			$("#name").val(results.rows.item(0).name);
			$("#bod").val(results.rows.item(0).bod);
			$("#last_donate").val(results.rows.item(0).last_donate);
			$("#nrc").val(results.rows.item(0).nrc);			
			$("#bloodgroup").val(results.rows.item(0).blood_type);
			$("#phoneNumber").val(results.rows.item(0).phoneNumber);			
			$("#township").val(results.rows.item(0).township);			
			$(".sex").val(results.rows.item(0).sex);						
			$(".wantTravelCharge").val(results.rows.item(0).wantTravelCharge);			
			$("body").pagecontainer("change", "#form");
		}
	});
	});
	});
	function BLOG(tx,results)
	{
		var d = '<ul data-role="listview"  >';
		var blog_lenght= results.rows.length;
	for(var i = 0; i < results.rows.length ; i++)
		{
			d += '<li>';
			d +='<a href="#">';
			if(results.rows.item(i).file_name != null)
				{
					d +='<img src="img/aids1.jpg" style="margin-top:2%;">';
				}
			d +='<h2>'+results.rows.item(i).blog_title+'</h2>';
			d +='<p>'+results.rows.item(i).blog_des+'</p>';
			d +='</a></li>';
		}
			d +='</ul>';
			$("#oldblogs").html(d);
			
				if(internet == 'yes')
					{	
							$.getJSON(base_url+'/index.php/blood/blog/blogjson/'+blog_lenght,function(data)
							{
								db.transaction(function (tx)
								{	
									tx.executeSql('CREATE TABLE IF NOT EXISTS BLOG (id unique, blog_title,blog_des,file_name)');			
									var d = '<ul data-role="listview"  >';
									for(var i = 0;i< data.length;i++)
										{
											var id= data[i]['blog_id'];
											var blog_title= data[i]['blog_title'];
											var blog_des= data[i]['blog_des'];
											var file_name= data[i]['file_name'];
											tx.executeSql('INSERT INTO BLOG (id, blog_title,blog_des,file_name) VALUES ( ?,?,?,?)',[id,blog_title,blog_des,file_name]);
											d += '<li>';
											d +='<a href="#">';
											d +='<img src="'+base_url+'/uploads/blog/thumbs/'+file_name+'" style="margin-top:2%;">';
											d +='<h2>'+blog_title+'</h2>';
											d +='<p>'+blog_des+'</p>';
											d +='</a></li>';
										}
										d +='</ul>';
										$("#newblogs").prepend(d);
								});
							
							});
					}
	}

}
$("#addbloodDonorForm").submit(function(){
	  var donatorData = $(this).serializeArray();
	 var avalible_time = '';
	 var id='';
	  for (index = 0; index < donatorData.length; ++index) {
		if(donatorData[index].name == 'name'){
			var name = donatorData[index].value;
			}
			if(donatorData[index].name == 'nrc'){
			var nrc = donatorData[index].value;
			}
			if(donatorData[index].name == 'sex'){
			var sex = donatorData[index].value;
			}
			if(donatorData[index].name == 'bod'){
			var bod = donatorData[index].value;
			}
			if(donatorData[index].name == 'blood_type'){
			var blood_type = donatorData[index].value;
			}
			if(donatorData[index].name == 'township'){
			var township = donatorData[index].value;
			}
			if(donatorData[index].name == 'facebook_link'){
			var facebook_link = donatorData[index].value;
			}		
			if(donatorData[index].name == 'phoneNumber'){
			var phoneNumber = donatorData[index].value;
			}		
			if(donatorData[index].name == 'last_donate'){
			var last_donate = donatorData[index].value;
			}		
			if(donatorData[index].name == 'wantTravelCharge'){
			var wantTravelCharge = donatorData[index].value;
			}
		if(donatorData[index].name == 'donation_time[]'){
			 avalible_time += donatorData[index].value;
			 avalible_time += ',';
		}
		if(donatorData[index].name == 'id'){
			  id = donatorData[index].value;
		}
		}
		$.ajax({
			url : base_url+'index.php/blood/addMobile',
			type : 'POST',
			data : {
				id : id,
				name:name,
				nrc : nrc,
				sex:sex,
				bod:bod,
				blood_type:blood_type,				
				township: township,
				facebook_link: facebook_link,
				phoneNumber:phoneNumber,
				last_donate:last_donate,
				wantTravelCharge:wantTravelCharge,
				avalible_time:avalible_time
			},
			success : function(data)
			{
			var id = data;
			db.transaction(function (tx)
				{	
				tx.executeSql('CREATE TABLE IF NOT EXISTS donator (id unique, name,nrc,sex,bod,blood_type,township,facebook_link,phoneNumber,last_donate,wantTravelCharge,avalible_time)');	
				tx.executeSql("SELECT * FROM donator WHERE id=?",[id],
					function(tx,results)
					{
						if(results.rows.length== 0)
						{
						tx.executeSql('INSERT INTO donator (id, name,nrc,sex,bod,blood_type,township,facebook_link,phoneNumber,last_donate,wantTravelCharge,avalible_time) VALUES ( ?,?,?,?,?,?,?,?,?,?,?,?)',[id,name,nrc,sex,bod,blood_type,township,facebook_link,phoneNumber,last_donate,wantTravelCharge,avalible_time]);
						}else
						{
						
							tx.executeSql("UPDATE donator SET name=?,nrc=?,sex=?,bod=?,blood_type=?,township=?,facebook_link=?,phoneNumber=?,last_donate=?,wantTravelCharge=?,avalible_time=? WHERE id=?",[name,nrc,sex,bod,blood_type,township,facebook_link,phoneNumber,last_donate,wantTravelCharge,avalible_time,id]);
						}
					});
							
				});
				$("body").pagecontainer("change", "#success");
			}
		});

			return false;
});
$("#needblood1").on('click','.iwilldonate',function(){
$("#progress").css("display","block");
var yourbloodtype = window.localStorage.getItem('blood_type');
var yourLastdonate = window.localStorage.getItem('last_donate');
var yourbod = window.localStorage.getItem('bod');

function getAge(dateString) 
{
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
    {
        age--;
    }
    return age;
}

function parseDate(str) {
    var mdy = str.split('-')
    return new Date( mdy[0]-1,mdy[1],mdy[2]);
}

function daydiff(first, second) {
    return (second-first)/(1000*3600*24);
}
var dateObj = new Date();
var month =dateObj.getUTCMonth() + 1; //months from 1-12 09;
var day = dateObj.getUTCDate();
var year = dateObj.getUTCFullYear();

var today = year + "-" + month + "-" + day;




var userid =window.localStorage.getItem('userid');
var blood_type = $(this).data("blood_type");
var NB_id = $(this).attr('id');
			
			

if(userid != null)
{
var dayBetween = daydiff(parseDate(yourLastdonate), parseDate(today));
if(getAge(yourbod)< 18)
	{
		$("#imformation").html("သင္၏ အသက္သည္ 18 ႏွစ္မျပည့္ေသးပါသျဖင့္ လွဴခြင့္မရွိေသးပါ");
		window.localStorage.setItem('NB_id'+NB_id,'2');
		$("#progress").css("display","none");
	}
else if(blood_type != yourbloodtype)
{
alert('blood_type' + blood_type +'your blood type'+yourbloodtype);
$("#imformation").html("<p>သင္ႏွင့္ ေသြးအမ်ိဳးအစားျခင္း မတူညီပါသျဖင့္ လွဴ၍ မရႏုိင္ပါ။</p>");
$("#progress").css("display","none");
}
 else if(getAge(yourbod) > 55)
	{
		$("#imformation").html("သင္၏ အသက္သည္ 55 ႏွစ္ ေက်ာ္သြားၿပီ ျဖစ္ပါသျဖင့္ လွဴ၍ မရႏိုင္ေတာ့ပါ။");
		window.localStorage.setItem('NB_id'+NB_id,'2');
		$("#progress").css("display","none");
	}
else if(dayBetween < 120)
	{
		$("#imformation").html("သင္ ေနာက္ဆံုးအႀကိမ္ေသြးလွဴထားတာ ေလးလ  မျပည့္ေသးပါသျဖင့္ လွဴ၍ မရႏုိင္ေသးပါ။");
		window.localStorage.setItem('NB_id'+NB_id,'2');
		$("#progress").css("display","none");
	}
else{
	$.ajax({
		url : base_url+'index.php/blood/addme/',
		type : 'post',
		data : {userid:userid},
		beforeSend : function()
		{
		
		},
		success : function(data)
		{
		$("#imformation").html("သင္လွဴႏုိင္သည့္ အေၾကာင္း တာဝန္ရွိသူထံ အေၾကာင္းၾကားၿပီး ျဖစ္ပါသည္။ ေက်းဇူးျပဳ၍ ဖုန္းေခၚလာသည္ကို ေစာင့္ဆုိင္းေပးပါရန္။");
		window.localStorage.setItem('NB_id'+NB_id,'1');
		$("#progress").css("display","none");
		}
	});
}
}else
{
$("#imformation").html("ေသြးလွဴရန္ ေသြးလွဴေဖါင္အား ျဖည့္သြင္းေပးရန္လိုအပ္ပါသည္။ေက်းဇူးျပဳ၍ ေအာက္ေျခရွိ Donation Form ဟူေသာ ခလုတ္ကို ႏွိပ္၍စာရင္းေပးသြင္းပါရန္။");
$("#progress").css("display","none");
}
	return false;
});

