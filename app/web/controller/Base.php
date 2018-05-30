<?php
namespace app\web\controller;
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
     * @cc 验证操作权限
     * @return [type] [description]
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
        // if (isset($this->userOauthInfo['key'])) {
        //     return $this->redirect(url('admin/login/index'));
        // }
        $this->create_time = date('Y-m-d h:i:s', time());

        $this->before();
    }

    /**
     * 继承者们的前置方法
     * @return [type] [description]
     */
    protected function before()
    {

    }

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

    //获取授权信息
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

    protected function postUrl($url, $data)
    {
        $curl = curl_init(); // 启动一个CURL会话
        curl_setopt($curl, CURLOPT_URL, $url); // 要访问的地址
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, FALSE); // 对认证证书来源的检查
        curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, FALSE); // 从证书中检查SSL加密算法是否存在
        curl_setopt($curl, CURLOPT_USERAGENT, 'Mozilla/5.0 (compatible; MSIE 5.01; Windows NT 5.0)'); // 模拟用户使用的浏览器
        //curl_setopt($curl, CURLOPT_FOLLOWLOCATION, 1); // 使用自动跳转
        //curl_setopt($curl, CURLOPT_AUTOREFERER, 1);    // 自动设置Referer
        curl_setopt($curl, CURLOPT_POST, 1);             // 发送一个常规的Post请求
        curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode($data));   // Post提交的数据包x
        curl_setopt($curl, CURLOPT_TIMEOUT, 30);         // 设置超时限制 防止死循环
        curl_setopt($curl, CURLOPT_HEADER, 0);           // 显示返回的Header区域内容
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);   // 获取的信息以文件流的形式返回

        $tmpInfo = curl_exec($curl); // 执行操作
        if(curl_errno($curl)) {
           $tmpInfo = 'Errno'.curl_error($curl);
        }
        curl_close($curl); // 关闭CURL会话
        return $tmpInfo; // 返回数据
    }

    /**
     * ajax返回数据
     * @param  integer $code  [description]
     * @param  string  $msg   [description]
     * @param  [type]  $data  [description]
     * @param  [type]  $total [description]
     * @return [type]         [description]
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

    //获取登陆信息
    protected function getUserInfo()
    {
        return session($this->key['app']);
    }
    //存储登陆信息
    protected function setUserInfo($info)
    {
        return session($this->key['app'],$info);
    }

    protected function createGuid() {
        return guid();
    }

}