import React from 'react';
import {Link} from 'react-router';
import Draggable from 'react-draggable';
import {Popup} from 'app/components';
import {url} from 'app/constants';
import {fetchData} from 'app/actions';
import {api, fn} from 'app/utils';
import {connect} from 'react-redux';
import {Form, TextInput, Radio, FileUpload} from '@xanda/react-components';
import * as selector from './selector';
import {makeGetProjectUsers} from 'app/containers/project/selector'
import Description from './edit/Description';
import Royalty from './edit/Royalty';
import Loyalty from './edit/Loyalty';
import Overview from './edit/Overview';
import {GroupWrapper} from 'app/containers/group';

@connect((state, ownProps) => {
    const getOrganisations = selector.makeGetOrganisations();
    const getOrganisation = selector.makeGetOrganisation();
    const getOrganisationTypes = selector.makeGetOrganisationTypes();
    const getProjectUsers = makeGetProjectUsers();

    return {
        organisations: getOrganisations(state),
        organisation: getOrganisation(state, ownProps.params.organisationId),
        organisationTypes: getOrganisationTypes(state),
        projectUsers: getProjectUsers(state),
        popup: state.popup,
        group: state.group
    };
})
export default class Edit extends React.PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            step: 1,
            formSubmitDisabled: false
        }
    }

    componentDidMount() {
        if ('add' !== this.props.params.organisationId) {
            this.fetchData();
        }
        this.fetchOrganisationTypes();
        this.fetchProjectUsers();
    }

    componentDidUpdate(prevProps) {
        const {organisation, popup, route, group, params} = this.props
        const organisationId = +params.organisationId
        const updateOrganisations = [...group.updatedOrganisations]
        const groupId = params.groupId

        if (popup.id != organisation.id) {
            if (_.includes(updateOrganisations, organisationId)) {
                _.map(group.collection[groupId].organisations, (organisation) => {
                    if (organisation.id === organisationId) {
                        this.props.dispatch({type: 'POPUP_UPDATED', payload: organisation})
                    }
                })
            } else {
                this.props.dispatch({type: 'POPUP_UPDATED', payload: organisation})
            }
        }
    }

    fetchData = () => {
        const {params} = this.props
        this.props.dispatch(fetchData({
            type: 'ORGANISATION',
            url: `/organisations/${params.organisationId}`
        }));
    }

    fetchGroup = () => {
        this.props.dispatch(fetchData({
            type: 'GROUP',
            url: `/groups/${this.props.params.groupId}`,
            groupId: this.props.params.groupId
        }));
    }

    fetchOrganisationTypes = () => {
        this.props.dispatch(fetchData({
            type: 'ORGANISATION_TYPE',
            url: `/organisation-types`,
        }));
    }

    fetchProjectUsers = () => {
        this.props.dispatch(fetchData({
            type: 'PROJECT_USER',
            url: `/users`,
        }));
    }

    handleInputChange = (name, value) => this.props.dispatch({type: 'POPUP_UPDATED', payload: {[name]: value}})

    handleStepChange = (newStep) => this.setState({step: newStep})

    setFormRef = (ref) => this.formRef = ref

    triggerSubmit = () => this.formRef.submit()

    handleSubmit = async () => {
        const {
            popup,
            params,
            organisation,
            location,
            dispatch
        } = this.props
        const {step} = this.state

        // submit an api call if your on the last step otherwise go to the next step
        if (step < 4) {
            const newStep = step + 1
            return this.handleStepChange(newStep)
        }
        // Disabled form submit after first time
        this.setState({
            formSubmitDisabled: true
        })

        const formData = new FormData()

        formData.append('title', popup.title)
        formData.append('abbreviation', popup.abbreviation)
        formData.append('description', popup.description)
        popup.icon && formData.append('icon_path', popup.icon)
        formData.append('icon_size', popup.icon_size)
        formData.append('positionX', popup.positionX)
        formData.append('positionY', popup.positionY)
        formData.append('type_id', popup.type_id)
        formData.append('rel_user_id', popup.rel_user_id)
        formData.append('group_id', params.groupId)

        let response
        if (organisation.id) {
            formData.append('id', organisation.id)
            response = await api.put(`/organisations/${organisation.id}`, formData)
        } else {
            response = await api.post('/organisations', formData)
        }

        if (!api.error(response)) {
            dispatch({
                type: 'DRAGGED_ORGANISATION_UPDATE',
                payload: {
                    organisation: response.data,
                    groupId: this.props.params.groupId,
                    save: true
                }
            })

            // Enabled form submit after process finish
            this.setState({
                formSubmitDisabled: false
            })
            const redirectUrl = location.query.zoom ? `/${url.projects}/${params.id}/${url.groups}/${params.groupId}/${url.zoom}?zoom=${location.query.zoom}` :
                `/${url.projects}/${params.id}/${url.groups}/${params.groupId}/${url.organisations}`

            fn.navigate(redirectUrl)
        }
    }

    popupActions = () => {
        const {
            step,
            formSubmitDisabled
        } = this.state
        const {organisation, params, location} = this.props
        const cancelUrl = location.query.zoom ? `/${url.projects}/${params.id}/${url.groups}/${params.groupId}/${url.zoom}?zoom=${location.query.zoom}` :
            `/${url.projects}/${params.id}/${url.groups}/${params.groupId}/${url.organisations}`

        switch (step) {
            case 1:
                return (
                    [
                        <Link to={cancelUrl}
                              className="button">Cancel
                        </Link>,
                        <button onClick={this.triggerSubmit}
                                type="button"
                                className="button">Next
                        </button>
                    ]
                );
            case 2:
                return (
                    [
                        <button type="button"
                                onClick={() => this.handleStepChange(1)}
                                className="button">Back
                        </button>,
                        <button onClick={this.triggerSubmit}
                                type="button"
                                className="button">Next
                        </button>
                    ]
                );
            case 3:
                return (
                    [
                        <button type="button"
                                onClick={() => this.handleStepChange(2)}
                                className="button">Back
                        </button>,
                        <button onClick={() => this.triggerSubmit()}
                                type="button"
                                className="button">Next
                        </button>
                    ]
                );
            case 4:
                return (
                    [
                        <button type="button"
                                onClick={() => this.handleStepChange(1)}
                                className="button">Edit
                        </button>,
                        <button onClick={() => this.handleSubmit()}
                                disabled={formSubmitDisabled}
                                type="button"
                                className="button">
                            {organisation.id ? 'Update' : 'Add to board'}
                        </button>
                    ]
                );
        }
    }

    editStep = () => {
        const passProps = {
            ...this.props.popup,
            handleInputChange: this.handleInputChange,
            handleSubmit: this.handleSubmit,
            setFormRef: this.setFormRef,
            organisationTypes: this.props.organisationTypes,
            projectUsers: this.props.projectUsers
        }

        switch (this.state.step) {
            case 1:
                return <Description {...passProps} />;
            case 2:
                return <Royalty {...passProps} />;
            case 3:
                return <Loyalty {...passProps} />;
            case 4:
                return <Overview {...passProps} />;
        }
    }

    render() {
        const {popup, params, location} = this.props
        const {step} = this.state
        const closePath = location.query.zoom ? `/${url.projects}/${params.id}/${url.groups}/${params.groupId}/${url.zoom}?zoom=${location.query.zoom}` :
            `/${url.projects}/${params.id}/${url.groups}/${params.groupId}`

        return (
            <GroupWrapper {...this.props}>
                <Popup
                    additionalClass={(step !== 4 ? `organisations wide` : 'organisations small-window')}
                    title={popup.title ? `Organisation: ${popup.title}` : `New Organisation`}
                    closePath={closePath}
                    buttons={this.popupActions()}
                >
                    {this.editStep()}
                </Popup>
            </GroupWrapper>
        );
    }
}
