<?php
namespace app\api\controller;
use think\Controller;
use think\Request;

class Index extends Controller
{
    protected function _initialize()
    {
        $this->create_time = date('Y-m-d h:i:s', time());
        $this->request = Request::instance();
        $this->before();
    }
    /**
     * 前置操作
     */
    protected function before()
    {

    }
}