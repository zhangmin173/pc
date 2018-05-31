<?php
namespace app\api\controller;
use think\Db;

class Form extends Base
{
    public function before()
	{
		$this->db = Db::name('form');
    }
    
    public function add()
    {   
        
        $params = input('');
        $params['id'] = $this->createGuid();
        $params['create_time'] = $this->now();
        $params['update_time'] = $this->now();

        if (!$this->db->insert($params)) {
            $this->data['success'] = false;
            $this->data['code'] = '2001';
            return $this->ajax($this->data);
        }
        
        $this->data['data'] = $this->db->where('id',$params['id'])->find();
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
        $params = input('');

        if (!isset($params['pageIndex'])) {
            $params['pageIndex'] = 1;
        }
        if (!isset($params['pageSize'])) {
            $params['pageSize'] = 10;
        }
        if (!isset($params['order'])) {
            $params['order'] = 'create_time desc';
        }

        $map = [
            'is_delete' => 0
        ];

        $db = $this->db->where($map);
        $this->data['total'] = $db->count();
        $this->data['data'] = $db->order($params['order'])->page($params['pageIndex'],$params['pageSize'])->select();
        return $this->ajax($this->data);
    }

    public function all()
    {
        $params = input('');

        if (!isset($params['order'])) {
            $params['order'] = 'create_time desc';
        }

        $map = [
            'is_delete' => 0
        ];

        $db = $this->db->where($map);
        $this->data['total'] = $db->count();
        $this->data['data'] = $db->order($params['order'])->select();
        return $this->ajax($this->data);
    }
}