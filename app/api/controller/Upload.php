<?php
namespace app\api\controller;
use think\Db;

class Upload extends Base
{
    public function before()
	{
		$this->db = Db::name('file');
    }
    
    public function add()
    {   
        $file = request()->file('postFile');
        $params = input('');
        //3.处理文件对象
        $path = ROOT_PATH . 'public' . DS . 'upload'; //文件保存的文件夹
        $info = $file->move($path); //移动文件到目录下
        if($info){
            $date = substr($info->getPath(),-8); //获取当前日期
            $filename= $info->getFilename(); //获取文件名
            $filepath= '/public/upload/'.$date.'/'.$info->getFilename(); //获取文件有效访问地址
            $size= $info->getSize(); //获取文件大小
            $filetype= $info->getExtension(); //获取文件类型
            //4.数据处理
            $params['id'] = $this->createGuid();
            $params['file_name'] = $filename;
            $params['file_path'] = $filepath;
            $params['file_size'] = $size;
            $params['fill_type'] = $filetype;
            
        }else{
            //上传失败获取错误信息
            $msg = $file->getError();
            $this->code = 0;
            $this->msg = $msg;
        }

        return $this->ajax($this->data);
    }

    public function update()
    {
        return $this->ajax($this->data);
    }

    public function delete()
    {
        return $this->ajax($this->data);
    }

    public function get()
    {
        return $this->ajax($this->data);
    }

    public function list()
    {
        return $this->ajax($this->data);
    }

    public function all()
    {
        return $this->ajax($this->data);
    }
}