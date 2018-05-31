<?php
namespace app\index\controller;
use think\Controller;
use think\Request;

class Base extends Controller
{
    protected $debug = false;
    protected $key = [
        'app' => 'zm_app',
        'oauth' => 'zm_oauth'
    ];
    
    /**
     * 验证权限
     */
    protected function _initialize()
    {
        $this->code = '000000';
        $this->msg = '成功';
        $this->data = null;
        $this->success = true;
        $this->total = 1;

        $this->userOauthInfo = $this->getUserOauthInfo();
        // 登陆验证跳转
        if (isset($this->userOauthInfo['key'])) {
            return $this->redirect(url('index/login/index'));
        }
        $this->create_time = date('Y-m-d h:i:s', time());

        $this->before();
    }

    /**
     * 前置操作
     */
    protected function before()
    {

    }

    /**
     * 获取请求信息
     */
    protected function getRequestInfo() {
        $res = [];
        $request = Request::instance();

        $res['HTTP_HOST'] = $_SERVER['HTTP_HOST'];
        $res['ROOT'] = $request->root();

        return $res;
    }

    protected function getParas() {
        $res = [];
        $request = Request::instance();

        return $request;
    }

    /**
     * 获取用户授权信息
     */
    protected function getUserOauthInfo()
    {
        if ($this->debug) {
            return [
                'openid'=>'o9-y-0zpSkPbcDqRpUel0kK50Adc',
                'nickname'=>'阿敏',
                'headimgurl'=>'http://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83eo3yW0arVaSoatJVz8AHdyW59tia3HJHk2s5sP9v6o3JpBqN1Hm8jSgNDxPwgxhwV42USic22PZPnDw/0',
                'sex'=>1
            ];
        }
        return session($this->key['oauth']);
    }

    /**
     * ajax返回
     */
    protected function ajaxReturn()
    {
        $res = [];

        $res['code'] = $this->code;
        $res['msg'] = $this->msg;
        $res['data'] = $this->data;
        $res['success'] = $this->success;
        $res['total'] = $this->total;

        return $res;
    }

    /**
     * 获取登陆信息
     */
    protected function getUserInfo()
    {
        return session($this->key['app']);
    }

    /**
     * 存储登陆信息
     */
    protected function setUserInfo($info)
    {
        return session($this->key['app'],$info);
    }

    /**
     * 创建guid
     */
    protected function createGuid() {
        return guid();
    }

}