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
        // 处理文件对象
        $path = ROOT_PATH . 'public' . DS . 'upload'; // 文件保存的文件夹
        $info = $file->move($path); // 移动文件到目录下
        if ($info) {
            $date = substr($info->getPath(),-8); // 获取当前日期
            $filename= $info->getFilename(); // 获取文件名
            $filepath= $this->request['host'].'/public/upload/'.$date.'/'.$info->getFilename(); // 获取文件有效访问地址
            $size= $info->getSize(); // 获取文件大小
            $filetype= $info->getExtension(); // 获取文件类型
            // 数据处理
            $params['id'] = $this->createGuid();
            $params['file_name'] = $filename;
            $params['file_path'] = $filepath;
            $params['file_size'] = $size;
            $params['file_type'] = $filetype;
            $params['create_time'] = $this->now();
            $params['update_time'] = $this->now();
            
            if (!$this->db->insert($params)) {
                $this->data['success'] = false;
                $this->data['code'] = '2001';
                return $this->ajax($this->data);
            }

            $this->data['data'] = $this->db->where('id',$params['id'])->find();
        } else {
            // 上传失败获取错误信息
            $this->data['success'] = false;
            $this->data['msg'] = $file->getError();
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

    public function page()
    {
        return $this->ajax($this->data);
    }

    public function all()
    {
        return $this->ajax($this->data);
    }
}