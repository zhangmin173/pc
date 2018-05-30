<?php
namespace app\web\controller;
use think\Db;

class Test extends Base
{

	public function index()
	{
		echo guid();
	}

}