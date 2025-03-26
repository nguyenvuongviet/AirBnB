import { Card, Row, Col, Image } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { Location } from "../../../../models/Location";
import { Pagination } from "antd";

const PAGE_SIZE = 8;

const Destinations: React.FC = () => {
  const { locations } = useSelector((state: RootState) => state.location);
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const paginatedLocations = locations.slice(startIndex, endIndex);

  return (
    <div className="flex flex-col items-center">
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
                />
              }
            >
              <Card.Meta
                title={location.tenViTri}
                description={`${location.tinhThanh}, ${location.quocGia}`}
              />
            </Card>
          </Col>
        ))}
      </Row>

      <Pagination
        current={currentPage}
        pageSize={PAGE_SIZE}
        total={locations.length}
        onChange={(page) => setCurrentPage(page)}
        className="mt-6"
      />
    </div>
  );
};

export default Destinations;
