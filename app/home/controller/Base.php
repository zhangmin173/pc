<?php
namespace app\home\controller;
use think\Controller;
use think\Request;
use think\Db;

class Base extends Controller
{
    protected $data = [
        'code' => 0,
        'success' => true,
        'msg' => '操作成功',
        'data' => null
    ];

    protected function _initialize()
    {
        $this->before();
    }

    /**
     * 前置操作
     */
    protected function before()
    {

    }

    /**
     * ajax返回
     */
    protected function ajax($data) 
    {
        if ($data['code'] == 1001) {
            $data['msg'] = '参数异常';
        }
        if ($data['code'] == 2001) {
            $data['msg'] = '服务器异常';
        }
        if ($data['code'] == 3001) {
            $data['msg'] = '不存在的资源';
        }
        return json($data);
    }

    /**
     * 当前时间
     */
    protected function now() 
    {
        return date('Y-m-d h:i:s', time());
    }
}