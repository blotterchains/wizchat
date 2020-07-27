from flask import Flask,request,jsonify
import werkzeug.exceptions
import sqlite3
class models:
    def __init__(self,file):
        self.file=file
    def uid(self,uid):
        sqlobj=sqlite3.connect(self.file)
        sqlobj.row_factory = sqlite3.Row
        cur=sqlobj.cursor()
        users=cur.execute('select * from users where uid=%s'%uid).fetchone()
        sqlobj.close()
        return dict(users)
    def ugp(self,uid):
        sqlobj=sqlite3.connect(self.file)
        sqlobj.row_factory=sqlite3.Row
        cur=sqlobj.cursor()
        cur.execute('select * from usrInGp where uid=%s'%uid)
        groups=cur.fetchall()
        _ret=[]
        for i in groups:
            gp=dict(cur.execute("select * from groups where id=%s"%i['gid']).fetchone())
            gp.update({
            "teacher":
             cur.execute("select * from users where uid=%s"%gp["tid"]).fetchone()[1]
            })
            _ret.append(gp)
        return _ret
    def gpm(self,gid):
        sqlobj=sqlite3.connect(self.file)
        sqlobj.row_factory=sqlite3.Row
        cur=sqlobj.cursor()
        cur.execute("select * from messages where gid=%s ORDER by id DESC"%gid)
        gmes=cur.fetchall()
        _ret=[]
        for i in gmes:
            groupMessage=dict(i)
            groupMessage.update(cur.execute('select name from users where uid=%s'%i["uid"]).fetchone())
            _ret.append(groupMessage)
        return _ret
    def spm(self,gid,uid,message):
        sqlobj=sqlite3.connect(self.file)
        sqlobj.row_factory=sqlite3.Row
        cur=sqlobj.cursor()
        cur.execute("""
                    INSERT INTO messages VALUES(
                        NULL,
                        %s,
                        %s,
                        "%s"
                    )"""%(
                            gid,
                            uid,
                            message
                         )
                   )
        sqlobj.commit()
        return "ok"
    def login(self,uid,passwd):
        sqlobj=sqlite3.connect(self.file)
        sqlobj.row_factory=sqlite3.Row
        cur=sqlobj.cursor()
        # try:
        cur.execute('select * from users where uid=%s and pswd="%s"'%(
            uid,passwd
            ))
        login=dict(cur.fetchone())
        login.pop("pswd")
        login.pop("id")
        return login
        # except :
        #     return {'status':'wrong'}
        
class fanni_semnan:
    def __init__(self,api):
        self.api=api
        self.index()
        self.getMsg()
        self.sendMsg()
        self.login()
        self.error()
        self.sql=models('dbs.db')
    def debuging(self,port=5000,ip="127.0.0.1",debug=True):
        self.api.run(port=port,host=ip,debug=debug)
    def index(self):
        @self.api.route('/', methods=["POST"])
        def index():
            uid=request.json["uid"]
            req=jsonify([self.sql.uid(uid),self.sql.ugp(uid)])
            return req
    def getMsg(self):
        @self.api.route('/getMsg',methods=["POST"])
        def getMsg():
            gid=request.json['gid']
            return jsonify(self.sql.gpm(gid))
    def sendMsg(self):
        @self.api.route('/sendMsg',methods=["POST"])
        def sendMsg():
            gid=request.json['gid']
            uid=request.json['uid']
            msg=request.json['msg']
            return jsonify({"status":self.sql.spm(gid,uid,msg)})
    def login(self):
        @self.api.route('/login',methods=["POST"])
        def login():
            uid=request.json["uid"]
            paswd=request.json["passwd"]
            return self.sql.login(uid,paswd)
    def error(self):
        @self.api.errorhandler(werkzeug.exceptions.BadRequest)
        def handle_bad_request(e):
            return 'bad Req'
if (__name__=='__main__'):
    api=fanni_semnan(Flask(__name__))
    api.debuging(port=8080,ip="192.168.1.104")
# api=Flask(__name__)
# # @api.errorhandler()
# @api
