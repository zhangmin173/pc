<?php
namespace app\home\controller;
use think\Db;

class Category extends Base
{
    public function before()
	{
		$this->db = Db::name('category');
    }

    public function get()
    {
        $params = input('');

        if (!isset($params['id'])) {
            $this->data['success'] = false;
            $this->data['code'] = 1001;
            return $this->ajax($this->data);
        }

        $map = [
            'id' => $params['id'],
            'is_delete' => 0
        ];

        $res = $this->db->where($map) ->find();
        if (!$res) {
            $this->data['code'] = 3001;
        } else {
            $this->data['data'] = $res;
        }
        
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

        $map['is_delete'] = 0;
        if (isset($params['paraent_id'])) {
            $map['paraent_id'] = $params['paraent_id'];
        }
        if (isset($params['web_id'])) {
            $map['web_id'] = $params['web_id'];
        }

        $db = $this->db;
        $this->data['count'] = $this->data['total'] = $db->where($map)->count();
        $this->data['data'] = $db->where($map)->order($params['order'])->page($params['pageIndex'],$params['pageSize'])->select();
        return $this->ajax($this->data);
    }

    public function all()
    {
        $params = input('');

        if (!isset($params['order'])) {
            $params['order'] = 'create_time desc';
        }

        $map['is_delete'] = 0;
        if (isset($params['paraent_id'])) {
            $map['paraent_id'] = $params['paraent_id'];
        }
        if (isset($params['web_id'])) {
            $map['web_id'] = $params['web_id'];
        }

        $db = $this->db;
        $this->data['count'] = $this->data['total'] = $db->where($map)->count();
        $this->data['data'] = $db->where($map)->order($params['order'])->select();
        return $this->ajax($this->data);
    }

    public function crumbs()
    {
        if (isset($params['web_id'])) {
            $map['web_id'] = $params['web_id'];
        } else {
            $this->data['success'] = false;
            $this->data['code'] = 1001;
            return $this->ajax($this->data);
        }

        $map['paraent_id'] = 0;
        $map['is_delete'] = 0;
        if (!isset($params['order'])) {
            $params['order'] = 'create_time desc';
        }

        $db = $this->db;

        $parant = $db->where($map)->select();

        $count = count($parant);
        for ($i=0; $i < $count; $i++) { 
            $id = $parant[$i]['id'];
            $map['paraent_id'] = $id;
            $parant[$i]['child'] = $db->where($map)->select();
        }

        $this->data['data'] = $parant;
        return $this->ajax($this->data);
    }
}