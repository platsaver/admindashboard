import React from 'react';
import { Card, Col, Divider, 
    List, Row, Button, Progress } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { LineChart, Line, XAxis, 
    YAxis, CartesianGrid, Tooltip, 
    Legend, ResponsiveContainer,
    PieChart, Pie, Cell } from 'recharts';


const fakeData = [
  { name: 'Tuần 1', ChỉSốA: 400, ChỉSốB: 300 },
  { name: 'Tuần 2', ChỉSốA: 450, ChỉSốB: 320 },
  { name: 'Tuần 3', ChỉSốA: 500, ChỉSốB: 350 },
  { name: 'Tuần 4', ChỉSốA: 520, ChỉSốB: 370 },
  { name: 'Tuần 5', ChỉSốA: 540, ChỉSốB: 390 },
];
const data = [
  { name: 'Vật chất', value: 50 },
  { name: 'Nhân sự', value: 20 },
  { name: 'Đối tác', value: 20 },
];
const eventsData = [
  {
    date: "Thứ Hai, ngày 26/05",
    count: 2,
    events: [
      { time: "14:30", title: "Ký kết hợp đồng hợp tác với đối tác X", status: "pending" },
    ],
  },
  {
    date: "Thứ Tư, ngày 28/05",
    count: 2,
    events: [
      { time: "10:00", title: "Đào tạo nhân viên mới về quy trình kiểm soát chất lượng", status: "ongoing" },
      { time: "15:00", title: "Hội thảo về ứng dụng AI trong tối ưu vận hành doanh nghiệp", status: "scheduled" },
    ],
  },
  {
    date: "Thứ Sáu, ngày 30/05",
    count: 2,
    events: [
      { time: "08:30", title: "Ra mắt sản phẩm mới và giới thiệu tại showroom", status: "scheduled" },
      { time: "16:00", title: "Báo cáo doanh thu tháng 5 và định hướng Q3", status: "pending" },
    ],
  },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const App = () => (
  <>
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={12} lg={8}>
        <Card
          title="Tổng số đối tác"
          className="shadow-sm rounded-lg bg-white"
          Style={{ fontSize: '1.25rem', fontWeight: '600' }}
        >
          <p className="text-gray-600 text-center text-lg" style={{fontSize: "20px"}}>10 đối tác</p>
        </Card>
      </Col>
      <Col xs={24} sm={12} lg={8}>
        <Card
          title="Số lượng nhân sự"
          className="shadow-sm rounded-lg bg-white"
          Style={{ fontSize: '1.25rem', fontWeight: '600' }}
        >
          <p className="text-gray-600 text-center text-lg" style={{fontSize: "20px"}}>350 nhân sự</p>
        </Card>
      </Col>
      <Col xs={24} sm={12} lg={8}>
        <Card
          title="Hoạt động trong tuần"
          className="shadow-sm rounded-lg bg-white"
          Style={{ fontSize: '1.25rem', fontWeight: '600' }}
        >
          <p className="text-gray-600 text-center text-lg" style={{fontSize: "20px"}}>45 hoạt động</p>
        </Card>
      </Col>
    </Row>
    <Divider orientation="left" />
        <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
            <Card
            title="Biểu đồ chỉ số theo tuần"
            className="shadow-sm rounded-lg bg-white"
            Style={{ fontSize: '1.25rem', fontWeight: '600' }}
            >
            <ResponsiveContainer width="100%" height={250}>
                <LineChart data={fakeData} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" stroke="#374151" />
                <YAxis domain={[0, 600]} stroke="#374151" />
                <Tooltip
                    contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', borderColor: '#e5e7eb' }}
                />
                <Legend verticalAlign="top" height={36} />
                <Line type="monotone" dataKey="ChỉSốA" stroke="#8884d8" strokeWidth={2} />
                <Line type="monotone" dataKey="ChỉSốB" stroke="#82ca9d" strokeWidth={2} />
                </LineChart>
            </ResponsiveContainer>
            </Card>
        </Col>
        <Col xs={24} lg={8}>
            <Card
                title="Thông tin khác"
                className="shadow-sm rounded-lg bg-white"
                style={{ fontSize: '1.25rem', fontWeight: '600' }}
            >
                <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                    <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label
                    >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
                </ResponsiveContainer>
            </Card>
        </Col>
        </Row>
    <Divider orientation="left" />
    <Row gutter={[16,16]}>
      <Col span={8}> 
        <Card
            title="Tiến độ doanh nghiệp"
            className="shadow-sm rounded-lg bg-white"
            Style={{ fontSize: '1.25rem', fontWeight: '600' }}
            >
            <div className="space-y-6">
                <div>
                <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-800">Doanh thu hàng tháng</span>
                    <span className="text-gray-600"></span>
                </div>
                <Progress percent={75} strokeColor="#1890ff" trailColor="#e5e7eb" showInfo={false} />
                </div>
                <div>
                <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-800">Hoàn thành dự án</span>
                    <span className="text-gray-600"></span>
                </div>
                <Progress percent={60} strokeColor="#52c41a" trailColor="#e5e7eb" showInfo={false} />
                </div>
                <div>
                <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-800">Hài lòng khách hàng</span>
                    <span className="text-gray-600"></span>
                </div>
                <Progress percent={85} strokeColor="#faad14" trailColor="#e5e7eb" showInfo={false} />
                </div>
            </div>
        </Card>
      </Col>
      <Col span={16}>
        <Card
          title={
            <div className="flex justify-between items-center">
              <span>Sự kiện gần đây</span>
            </div>
          }
          className="shadow-sm rounded-lg bg-white"
          Style={{ fontSize: '1.25rem', fontWeight: '600', padding: '8px 16px' }}
        >
          <List
            dataSource={eventsData}
            renderItem={(item) => (
              <List.Item>
                <div className="w-full">
                  <div className="flex justify-between items-start" style={{fontSize: "16px"}}>
                    <strong className="text-gray-800">{item.date} {item.count > 0 && <span className="text-red-500"></span>}</strong>
                  </div>
                  <ul className="mt-2" style={{fontSize: "16px"}}>
                    {item.events.map((event, index) => (
                      <li key={index} className="py-2 border-b border-gray-200 last:border-b-0">
                        <div className="flex items-center">
                          <span className="text-gray-600 mr-4">{event.time}</span>
                          <span className="text-gray-800"> {event.title}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </List.Item>
            )}
          />
        </Card>
      </Col>
    </Row>
  </>
);

export default App;