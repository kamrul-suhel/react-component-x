import React from "react";
import {Link} from "react-router";
import {Popup} from "app/components";
import {url} from "app/constants";
import {fetchData} from "app/actions";
import {api, fn} from "app/utils";
import {connect} from "react-redux";
import * as selector from "./selector";
import GroupWrapper from "./Wrapper";
import {CharacterPosition} from "app/components"
import Slider from "react-slick";
import {makeGetProject, makeGetProjects} from 'app/containers/project/selector'

@connect((state, ownProps) => {
    const getGroups = selector.makeGetGroups();
    const getGroup = selector.makeGetGroup();
    const getProjects = makeGetProjects();
    const getProject = makeGetProject();

    return {
        groups: getGroups(state),
        group: getGroup(state, ownProps.params.groupId),
        projects: getProjects(state),
        project: getProject(state, ownProps.params.id),
        popup: state.popup
    };
})
export default class Edit extends React.PureComponent {
    constructor(props) {
        super(props);

        const {location} = props;

        this.state = {
            activeSlide: location.query.character ? location.query.character - 1 : 0,
            characterPos: false,
            selectedCharacter: {}
        };
    }

    componentDidMount() {
        if ("add" !== this.props.params.personId) {
            // this.fetchData();
        }
    }

    componentDidUpdate(prevProps) {
        // const {person, popup, route} = this.props;
        // if (popup.id != person.id) {
        //     this.props.dispatch({type: "POPUP_UPDATED", payload: person});
        // }
    }

    fetchData = () => {
        this.props.dispatch(fetchData({
            type: 'GROUP',
            url: `/groups/${this.props.params.groupId}`,
            groupId: this.props.params.groupId
        }));
        this.props.dispatch(fetchData({
            type: 'PROJECT',
            url: `/projects/${this.props.params.id}`,
            projectId: this.props.params.id
        }));
    };

    fetchGroup = () => {
        const {params} = this.props;
        this.props.dispatch(
            fetchData({
                type: "GROUP",
                url: `/groups/${params.groupId}`
            })
        );
    };

    handleSubmit = async () => {
        const {params, location} = this.props;
        const {activeSlide} = this.state;

        // Find the character_id by activeSlide id
        let characterId = 0
        _.map(fn.getPeopleCharacters(), (character, index) => {
            if(index === activeSlide){
                characterId = character.id
            }
        })

        let formData = new FormData()
        formData.append('character_id', characterId)

        const response = await api.put(`/${url.organisations}/${params.organisationId}`, formData);

        if (!api.error(response)) {
            this.fetchGroup();
            let redirectUrl = `/${url.projects}/${params.id}/${url.groups}/${params.groupId}/${url.organisations}`
            redirectUrl = location.query.zoom ? `${redirectUrl}?zoom=${location.query.zoom}` : redirectUrl
            fn.navigate(redirectUrl);
        }
    };

    handleCharacterPos(event, character) {
        event.preventDefault()
        this.setState({
            characterPos: true,
            selectedCharacter: {...character}
        })
    }

    handleCloseCharacterPosBox(event) {
        event.preventDefault()
        this.setState({
            characterPos: false,
            selectedCharacter: {}
        })
    }

    handleRemoveCharacterIcon = async (characterId) => {
        const { location, params } = this.props
        // TODO maybe feature request we need this
        // let formData = new FormData()
        // formData.append('character_id', characterId)
        // const response = await api.put(`/${url.organisations}/${params.organisationId}`, formData)

        let cancelCharacterLink = `/${url.projects}/${params.id}/${url.groups}/${params.groupId}/${url.organisations}`
        cancelCharacterLink = location.query.zoom ? `${cancelCharacterLink}?zoom=${location.query.zoom}` : cancelCharacterLink

        // if (!api.error(response)) {
            this.fetchGroup()
            fn.navigate(cancelCharacterLink)
        // }
    }

    render() {
        const {popup, params, location, group} = this.props;
        const {step, characterPos, selectedCharacter} = this.state;
        const characters = fn.getPeopleCharacters();

        const sliderSettings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            beforeChange: (current, next) => this.setState({activeSlide: next}),
            initialSlide: (location.query.character) ? (location.query.character - 1) : 0
        };

        let cancelCharacterLink = `/${url.projects}/${params.id}/${url.groups}/${params.groupId}/${url.organisations}`
        cancelCharacterLink = location.query.zoom ? `${cancelCharacterLink}?zoom=${location.query.zoom}` : cancelCharacterLink

        return (
            <div className="character-container">
                <GroupWrapper {...this.props}>
                    <Popup
                        additionalClass={step !== 4 ? `people` : "people small-window"}
                        title={group.title && `Organisation: ${group.title}`}
                        closePath={`/${url.projects}/${params.id}/${url.groups}/${
                            params.groupId
                            }`}
                        buttons={
                            <React.Fragment>
                                <button className="button"
                                        onClick={() => this.handleRemoveCharacterIcon(0)}>Cancel
                                </button>

                                <span
                                    className="clickable button"
                                    onClick={this.handleSubmit}
                                >Choose</span>
                            </React.Fragment>
                        }
                    >
                        <div className="character-inner">
                            <p className="form-label form-label-title">Choose a character</p>
                            <Slider {...sliderSettings}>
                                {_.map(characters, (item) => (
                                    <div className="character-slide">
                                        <img
                                            className="character-image"
                                            src={`/../../../images/${item["largeImage"]}`}
                                        />
                                        <h3 className="character-title">{item["title"]}</h3>
                                        <p className="character-description">
                                            {item["description"]}
                                        </p>

                                        <div className="suggested-grid-content">
                                            <a href="#"
                                               onClick={(event) => this.handleCharacterPos(event, item)}
                                               className="suggested-grid"
                                            >Suggested grid position</a>
                                        </div>
                                    </div>
                                ))}
                            </Slider>
                        </div>
                    </Popup>
                </GroupWrapper>

                {
                    characterPos ? <CharacterPosition {...this.props}
                                                      selectedCharacter={selectedCharacter}
                                                      handleCloseCharacterPosBox={(event) => this.handleCloseCharacterPosBox(event)}></CharacterPosition>
                        : null
                }
            </div>
        );
    }
}
