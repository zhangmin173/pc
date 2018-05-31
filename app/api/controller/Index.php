<?php
namespace app\api\controller;
use think\Controller;
use think\Request;

class Index extends Controller
{
    public function before()
	{
		$this->db = Db::name('user');
    }
    
    public function index()
    {
        dump($this->request->module());
        dump($this->request->controller());
        dump($this->request->action());
        echo 'api';
    }
}