import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './shipment.reducer';
import { IShipment } from 'app/shared/model/shipment.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IShipmentDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ShipmentDetail extends React.Component<IShipmentDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { shipmentEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="storeApp.shipment.detail.title">Shipment</Translate> [<b>{shipmentEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="trackingCode">
                <Translate contentKey="storeApp.shipment.trackingCode">Tracking Code</Translate>
              </span>
            </dt>
            <dd>{shipmentEntity.trackingCode}</dd>
            <dt>
              <span id="date">
                <Translate contentKey="storeApp.shipment.date">Date</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={shipmentEntity.date} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="details">
                <Translate contentKey="storeApp.shipment.details">Details</Translate>
              </span>
            </dt>
            <dd>{shipmentEntity.details}</dd>
            <dt>
              <Translate contentKey="storeApp.shipment.invoice">Invoice</Translate>
            </dt>
            <dd>{shipmentEntity.invoice ? shipmentEntity.invoice.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/shipment" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/shipment/${shipmentEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.edit">Edit</Translate>
            </span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ shipment }: IRootState) => ({
  shipmentEntity: shipment.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShipmentDetail);
