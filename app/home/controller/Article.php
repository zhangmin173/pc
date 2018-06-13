<?php
namespace app\home\controller;
use think\Db;

class Article extends Base
{
    public function before()
	{
		$this->db = Db::name('article');
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
        if (isset($params['title'])) {
            $map['title'] = ['like','%'.$params['title'].'%'];
        }
        if (isset($params['author'])) {
            $map['author'] = ['like','%'.$params['author'].'%'];
        }
        if (isset($params['category_ids'])) {
            $map['category_ids'] = ['like','%'.$params['category_ids'].'%'];
        }
        if (isset($params['category_id'])) {
            $map['category_ids'] = $params['category_id'];
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

        if (isset($params['title'])) {
            $map['title'] = ['like','%'.$params['title'].'%'];
        }
        if (isset($params['author'])) {
            $map['author'] = ['like','%'.$params['author'].'%'];
        }
        if (isset($params['category_ids'])) {
            $map['category_ids'] = ['like','%'.$params['category_ids'].'%'];
        }
        if (isset($params['category_id'])) {
            $map['category_ids'] = $params['category_id'];
        }

        $db = $this->db;
        $this->data['count'] = $this->data['total'] = $db->where($map)->count();
        $this->data['data'] = $db->where($map)->order($params['order'])->select();
        return $this->ajax($this->data);
    }
}