import { Card, Col, Popover, Row, Spin, Typography } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Location } from "../../../models/Location";
import { AppDispatch, RootState } from "../../../store";
import { fetchWeather } from "../../../store/slices/weather";

const { Text, Title } = Typography;

interface WeatherProps {
  selectedLocation: Location;
  coordinates: { latitude: number | null; longitude: number | null };
}

const Weather: React.FC<WeatherProps> = ({ selectedLocation, coordinates }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useSelector(
    (state: RootState) => state.weather
  );

  const { latitude, longitude } = coordinates;

  useEffect(() => {
    dispatch(fetchWeather(`${latitude},${longitude}`));
  }, [dispatch, selectedLocation, latitude, longitude]);

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "20px" }}>
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <Text type="danger">Lỗi: {error}</Text>
      </div>
    );
  }

  if (!data) return null;

  const { current } = data;

  const popoverContent = (
    <div style={{ textAlign: "left", maxWidth: "300px" }}>
      <Text>
        🌡️ Cảm giác như: <strong>{current.feelslike_c}°C</strong>
      </Text>
      <br />
      <Text>
        💧 Độ ẩm: <strong>{current.humidity}%</strong>
      </Text>
      <br />
      <Text>
        🌬️ Gió: <strong>{current.wind_kph} km/h</strong> ({current.wind_dir})
      </Text>
      <br />
      <Text>
        ☁️ Mây: <strong>{current.cloud}%</strong>
      </Text>
      <br />
      <Text>
        🔆 UV: <strong>{current.uv}</strong>
      </Text>
      <br />
      <Text>
        🕒 Cập nhật: <strong>{current.last_updated}</strong>
      </Text>
    </div>
  );

  return (
    <div className="py-4 w-full mx-auto">
      <Title level={4} className="text-center">
        Thời tiết tại {selectedLocation.tenViTri}
      </Title>
      <Popover
        content={popoverContent}
        title="Chi tiết thời tiết"
        trigger="hover"
      >
        <Card
          hoverable
          styles={{ body: { padding: "15px" } }}
          className="rounded-lg shadow-lg hover:shadow-xl transition duration-300"
        >
          <Row gutter={[30, 24]} align="middle" justify="center">
            <Col>
              <img
                src={current.condition.icon}
                alt={current.condition.text}
                style={{ width: "50px" }}
              />
            </Col>
            <Col>
              <Title level={2} style={{ marginBottom: "0" }}>
                {current.temp_c}°C
              </Title>
              <Text type="secondary">{current.condition.text}</Text>
            </Col>
          </Row>
        </Card>
      </Popover>
    </div>
  );
};

export default Weather;
