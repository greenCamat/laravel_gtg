<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">

<title>GTG - My Profile</title>
<meta name="description" content="">
<meta name="viewport" content="width=1080">
<!--CSS-->
<link rel="stylesheet" href="{!! asset('css/custom.css') !!}" type="text/css">
<link rel="stylesheet" href="{!! asset('css/style.css') !!}" type="text/css">
<link rel="stylesheet" href="../css/style2.css">
<link rel="stylesheet" href="../css/mq.css">
<link rel="stylesheet" href="../css/transition.css">

</head>
<body>
<p class="hello">Hello</p>

<p><?php echo app_path(); 
    echo "<br />";
    echo asset('custom.css');
?></p>

</body>
</html>