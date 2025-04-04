import { Card, Col, Image, Pagination, Row, Skeleton } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Location } from "../../../../models/Location";
import { RootState } from "../../../../store";
import { useNavigate } from "react-router-dom";

const PAGE_SIZE = 8;

const Destinations: React.FC = () => {
  const { locations, loading } = useSelector(
    (state: RootState) => state.location
  );
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const paginatedLocations = locations.slice(startIndex, endIndex);

  const handleCardClick = (locationId: number) => {
    navigate(`/list-room/${locationId}`);
  };

  return (
    <div className="flex flex-col items-center">
      {loading ? (
        <Row gutter={[16, 16]} justify="center">
          {Array.from({ length: PAGE_SIZE }).map((_, index) => (
            <Col key={index} xs={24} sm={12} md={8} lg={6}>
              <Card
                hoverable
                className="rounded-lg overflow-hidden shadow-md"
                cover={
                  <Skeleton.Image
                    active
                    style={{ width: "100%", height: 180 }}
                  />
                }
              >
                <Skeleton active title paragraph={{ rows: 2 }} />
              </Card>
            </Col>
          ))}
        </Row>
      ) : locations.length === 0 ? (
        <div className="text-center text-gray-500 text-lg mt-4">
          Không có dữ liệu.
        </div>
      ) : (
        <>
          <Row gutter={[16, 16]} justify="center">
            {paginatedLocations.map((location: Location, index) => (
              <Col key={index} xs={24} sm={12} md={8} lg={6}>
                <Card
                  hoverable
                  className="rounded-lg overflow-hidden shadow-md"
                  cover={
                    <Image
                      alt={location.tenViTri}
                      src={location.hinhAnh}
                      width="100%"
                      height={180}
                      style={{ objectFit: "cover" }}
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    />
                  }
                >
                  <div onClick={() => handleCardClick(location.id)}>
                    <Card.Meta
                      title={location.tenViTri}
                      description={`${location.tinhThanh}, ${location.quocGia}`}
                    />
                  </div>
                </Card>
              </Col>
            ))}
          </Row>

          {locations.length > 0 && (
            <Pagination
              current={currentPage}
              pageSize={PAGE_SIZE}
              total={locations.length}
              onChange={(page) => setCurrentPage(page)}
              className="mt-6"
            />
          )}
        </>
      )}
    </div>
  );
};

export default Destinations;
