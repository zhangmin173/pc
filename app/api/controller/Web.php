<?php
namespace app\api\controller;
use think\Db;

class Web extends Base
{
    public function before()
	{
		$this->db = Db::name('web');
    }
    
    public function add()
    {   
        $params = input('');
        $params['id'] = $this->createGuid();
        $params['create_time'] = $this->now();
        $params['update_time'] = $this->now();

        if (!isset($params['web_title'])) {
            $this->data['success'] = false;
            $this->data['code'] = '1001';
            return $this->ajax($this->data);
        }

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
        $params = input('');
        $params['update_time'] = $this->now();

        if (!isset($params['id'])) {
            $this->data['success'] = false;
            $this->data['code'] = '1001';
            return $this->ajax($this->data);
        }

        $this->data['data'] = $this->db->update($params);
        return $this->ajax($this->data);
    }

    public function delete()
    {
        $params = input('');
        $params['update_time'] = $this->now();
        $params['is_delete'] = 1;

        if (!isset($params['id'])) {
            $this->data['success'] = false;
            $this->data['code'] = '1001';
            return $this->ajax($this->data);
        }

        $this->data['data'] = $this->db->update($params);
        return $this->ajax($this->data);
    }

    public function get()
    {
        $params = input('');

        if (!isset($params['id'])) {
            $this->data['success'] = false;
            $this->data['code'] = '1001';
            return $this->ajax($this->data);
        }

        $map = [
            'id' => $params['id'],
            'is_delete' => 0
        ];

        $res = $this->db->where($map) ->find();
        if (!$res) {
            $this->data['code'] = '3001';
        } else {
            $this->data['data'] = $res;
        }
        
        return $this->ajax($this->data);
    }

    public function list()
    {
        $params = input('');

        if (!isset($params['pageIndex'])) {
            
        }
        if (!isset($params['pageSize'])) {
            
        }

        $map = [
            'id' => $params['id'],
            'is_delete' => 0
        ];

        $db = $this->db->where('pathname',$data['pathname']);
		$pv = $db->count();
		$pvToday = $db->whereTime('create_time', 'today')->count();
        $res = $this->db->find($map);
        $this->data['data'] = $res;
        return $this->ajax($this->data);
    }

    public function all()
    {
        return $this->ajax($this->data);
    }
}