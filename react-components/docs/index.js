import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { setDefaults, withInfo } from '@storybook/addon-info';
import mapStyle from './mapStyle';
import {
	Accordion,
	Checkbox,
	ContentLoader,
	DatePicker,
	Dialog,
	DynamicContent,
	FileUpload,
	Filter,
	Form,
	GoogleMap,
	Loader,
	MultiSelect,
	Pagination,
	Radio,
	Repeater,
	RichText,
	Select,
	Slider,
	Tab,
	Table,
	TextInput,
	TimePicker,
	TinyMCE,
	Tooltip,
} from '../src';
import '../sass/layout.scss';

setDefaults({
	inline: true,
	source: true,
	maxPropsIntoLine: 1,
});

const genderOptions = [
	{ id: 'male', title: 'Male' },
	{ id: 'female', title: 'Female' },
];

const termOptions = [
	{ id: 1, title: 'Terms and conditions' },
];

const availableOptions = [
	{ id: 'option1', title: 'Option 1' },
	{ id: 'option2', title: 'Option 2' },
	{ id: 'option3', title: 'Option 3' },
	{ id: 'option4', title: 'Option 4' },
	{ id: 'option5', title: 'Option 5' },
];

const filterOptions = [
	{ key: 'search', label: 'Search', type: 'text' },
	{ key: 'options', label: 'Available Options', type: 'select', options: availableOptions },
	{ key: 'gender', label: 'Gender', type: 'select', options: genderOptions },
];

// storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Checkbox')} />);

storiesOf('Accordion', module)
	.add('Basic', withInfo()(() => (
		<div>
			<Accordion title="Bio" onOpen={action('onOpen')}>
				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
			</Accordion>
			<Accordion title="Story">
				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
			</Accordion>
		</div>)))
	.add('Default open', withInfo()(() => (
		<Accordion title="Bio" open>
			<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
		</Accordion>)))
	.add('Disabled', withInfo()(() => (
		<Accordion title="Bio" disabled>
			<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
		</Accordion>)))
	.add('Once open cannot be closed', withInfo()(() => (
		<Accordion title="Bio" closeable={false}>
			<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
		</Accordion>)));

storiesOf('Checkbox', module)
	.add('Basic', withInfo()(() =>
		<Checkbox label="Options" options={availableOptions} />))
	.add('Default value', withInfo()(() =>
		<Checkbox name="selectedOptions" label="Options" value={['option1', 'option2']} options={availableOptions} onChange={action('onChange')} />))
	.add('Styled', withInfo()(() =>
		<Checkbox styled label="Options" options={availableOptions} />))
	.add('Single option', withInfo()(() =>
		<Checkbox name="terms" options={[{ id: 1, title: 'I have read and agree to Terms.' }]} onChange={action('onChange')} />));

storiesOf('ContentLoader', module)
	.add('Fetching data', withInfo()(() => (
		<ContentLoader isLoading>
			<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
		</ContentLoader>)))
	.add('Fetched data', withInfo()(() => (
		<ContentLoader isLoading={false} data>
			<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
		</ContentLoader>)));

storiesOf('Dialog', module)
	.add('Basic', withInfo()(() => (
		<Dialog title="Basic popup" content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.">
			<button>Click to open</button>
		</Dialog>)))
	.add('With buttons', withInfo({ text: <h3>Buttons should be an array of elements. Each element should have its own key. If a button has a <code>key="cancel"</code> then on click automaticaly closes the dialog. Other buttons should have its own onClick function and if on success the dialog needs to be closed, then this should be done manually via the ref attributes e.g. <code>this.refForm.close()</code>.</h3> })(() => (
		<Dialog
			title="Basic popup"
			content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
			buttons={[
				<button key="cancel">Cancel</button>,
				<button key="confirm" onClick={action('Confirmed')}>Confirm</button>,
			]}
		>
			<button>Click to open</button>
		</Dialog>)));

storiesOf('DatePicker', module)
	.add('Basic', withInfo()(() =>
		<DatePicker label="Date of birth" name="dob" onChange={action('onChange')} />))
	.add('Default value', withInfo()(() =>
		<DatePicker label="Date of birth" name="dob" value="2017-12-24 00:00:00" onChange={action('onChange')} />))
	.add('Prepend', withInfo()(() =>
		<DatePicker label="Date of birth" name="dob" onChange={action('onChange')} prepend={<i className="ion-android-calendar" />} />))
	.add('Append', withInfo()(() =>
		<DatePicker label="Date of birth" name="dob" onChange={action('onChange')} append={<i className="ion-android-calendar" />} />));

storiesOf('DynamicContent (deprecated)', module)
	.add('Fetching data', withInfo({ text: <h3>This component is deprecated, please use <i>ContentLoader</i> instead</h3> })(() => (
		<DynamicContent fetched={false} fetching>
			<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
		</DynamicContent>)))
	.add('Fetched data', withInfo({ text: <h3>This component is deprecated, please use <i>ContentLoader</i> instead</h3> })(() => (
		<DynamicContent fetched fetching={false}>
			<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
		</DynamicContent>)));

storiesOf('FileUpload', module)
	.add('Basic', withInfo()(() =>
		<FileUpload name="firstName" label="First name" onChange={action('onChange')} />))
	.add('Prepend', withInfo()(() =>
		<FileUpload name="firstName" label="First name" prepend={<i className="ion-android-upload" />} onChange={action('onChange')} />))
	.add('Append', withInfo()(() =>
		<FileUpload name="firstName" label="First name" append={<i className="ion-android-upload" />} onChange={action('onChange')} />))
	.add('Clearable', withInfo()(() =>
		<FileUpload clearable name="firstName" label="First name" onChange={action('onChange')} />));

storiesOf('Filter', module)
	.add('Filters on update', withInfo()(() =>
		<Filter onUpdate={action('onUpdate')} filters={filterOptions} />))
	.add('Filters on submit', withInfo()(() =>
		<Filter onSubmit={action('onSubmit')} filters={filterOptions} />));

storiesOf('Form', module)
	.add('Basic', withInfo({ propTablesExclude: [TextInput] })(() => (
		<Form onSubmit={action('onSubmit')}>
			<TextInput name="firstName" label="First name" />
			<TextInput name="lastName" label="Last name" />
			<TextInput name="email" label="Email" />

			<button>Submit</button>
		</Form>)))
	.add('With loader', withInfo({ text: <h3>On form submission a form-loading className will be added to the form-wrapper and the form will be blocked from any further update or submission. Removing the loading className has to be done manually by calling the <code>hideLoader()</code> method e.g. <code>this.refForm.hideLoader(). Styling needs to be applied from the theme. Check the example as per gitlab.</code></h3>, propTablesExclude: [TextInput] })(() => (
		<Form onSubmit={action('onSubmit')} loader>
			<TextInput name="firstName" label="First name" />
			<TextInput name="lastName" label="Last name" />
			<TextInput name="email" label="Email" />

			<button>Submit</button>
		</Form>)))
	.add('With validation', withInfo({ propTablesExclude: [Checkbox, DatePicker, FileUpload, MultiSelect, Radio, Repeater, Select, TimePicker, TextInput] })(() => (
		<Form onSubmit={action('onSubmit')}>
			<TextInput name="firstName" label="First name" validation="required|except:raul,mark" />
			<TextInput name="email" label="Email" validation="required|email" />
			<FileUpload name="pic" label="Picture" validation="required|file|max:200" />
			<Radio styled name="gender" label="Gender" options={genderOptions} validation="required" />
			<Checkbox styled name="options" label="Options" options={availableOptions} validation="required|min:2|max:3" />
			<DatePicker name="dob" label="Date of birth" validation="required" />
			<TimePicker name="eventStart" label="Event Start" validation="required" />
			<MultiSelect name="options" label="Options" options={availableOptions} validation="required|min:2|max:3" />
			<Repeater addButton="Add new user" count={1} name="users" onChange={action('onChange')}>
				<TextInput name="firstName" label="First name" validation="required" />
				<Select name="age" label="Age" options={availableOptions} validation="required" />
			</Repeater>

			<button>Submit</button>
		</Form>)))
	.add('With floating labels', withInfo({ propTablesExclude: [TextInput] })(() => (
		<Form onSubmit={action('onSubmit')} loader>
			<TextInput withFloatingLabel name="firstName" label="First name" />
			<TextInput withFloatingLabel name="lastName" label="Last name" />
			<Radio wide withFloatingLabel name="gender" label="Gender" options={genderOptions} />
			<TextInput withFloatingLabel textarea name="notes" label="Notes" />
			<Select withFloatingLabel name="sizes" label="Available options" options={availableOptions} />

			<button>Submit</button>
		</Form>)));

storiesOf('GoogleMap', module)
	.add('Basic', withInfo()(() =>
		<GoogleMap lat={51.5850819} lng={-0.163591} />))
	.add('Different zoom', withInfo()(() =>
		<GoogleMap lat={51.5850819} lng={-0.163591} zoom={19} />))
	.add('Styled map', withInfo()(() =>
		<GoogleMap lat={51.5850819} lng={-0.163591} styles={mapStyle} />));

storiesOf('Loader', module)
	.add('Basic', withInfo()(() =>
		<Loader />));

storiesOf('MultiSelect', module)
	.add('Basic', withInfo()(() =>
		<MultiSelect name="options" label="Options" options={availableOptions} onChange={action('onChange')} />))
	.add('Multiple labels', withInfo()(() =>
		<MultiSelect name="options" label={['Available Options', 'Selected Options']} options={availableOptions} onChange={action('onChange')} />))
	.add('Default values', withInfo()(() =>
		<MultiSelect name="options" label={['Available Options', 'Selected Options']} value={[{ id: 'option1', title: 'Option 1' }]} options={availableOptions} onChange={action('onChange')} />))
	.add('Lock preselected options', withInfo()(() =>
		<MultiSelect clearable={false} name="options" label={['Available Options', 'Selected Options']} value={[{ id: 'option1', title: 'Option 1' }]} options={availableOptions} onChange={action('onChange')} />));

storiesOf('Radio', module)
	.add('Basic', withInfo()(() =>
		<Radio name="gender" label="Gender" options={genderOptions} onChange={action('onChange')} />))
	.add('Default value', withInfo()(() =>
		<Radio name="gender" label="Gender" value="male" options={genderOptions} onChange={action('onChange')} />))
	.add('Default value with single option', withInfo()(() =>
		<Radio name="gender" value={1} options={termOptions} onChange={action('onChange')} />))
	.add('Styled', withInfo()(() =>
		<Radio styled name="gender" label="Gender" options={genderOptions} onChange={action('onChange')} />));

const repeaterValue = [
	{ first_name: 'Peter', last_name: 'Xanda', gender: 'male', pic: 'https://www.xanda.net/image.png' },
	{ first_name: 'John', last_name: 'Xanda', gender: 'male' },
	{ first_name: 'Nikki', last_name: 'Xanda', gender: 'female' },
];

const repeaterValueExtractor = {
	firstName: 'first_name',
	lastName: 'last_name',
	gender: 'gender',
	pic: 'pic',
};

const repeaterRowAppend = (option) => {
	if (option.gender === 'male') {
		return <TextInput name="firstName" label="Male First Name" />;
	}

	return <TextInput name="firstName" label="Female First Name" />;
};

storiesOf('Repeater', module)
	.add('Basic', withInfo({ propTablesExclude: [TextInput] })(() => (
		<Repeater name="sizes" onChange={action('onChange')} onRemoved={action('onRemoved')}>
			<TextInput label="Size" name="size" />
		</Repeater>)))
	.add('Max Limit', withInfo({ propTablesExclude: [TextInput] })(() => (
		<Repeater name="sizes" max={5} onChange={action('onChange')}>
			<TextInput label="Size" name="size" />
		</Repeater>)))
	.add('Multiple input', withInfo({ propTablesExclude: [TextInput, Radio] })(() => (
		<Repeater addButton="Add new user" count={1} name="users" value={repeaterValue} valueExtractor={repeaterValueExtractor} onChange={action('onChange')}>
			<TextInput name="firstName" label="First name" />
			<TextInput name="lastName" label="Last name" />
			<Radio styled name="gender" label="Gender" options={genderOptions} />
			<FileUpload name="pic" label="Picture" />
		</Repeater>)))
	.add('Row append ', withInfo({ propTablesExclude: [TextInput, Radio] })(() => (
		<Repeater addButton="Add new user" onRowAppend={repeaterRowAppend} count={1} name="users" value={repeaterValue} valueExtractor={repeaterValueExtractor} onChange={action('onChange')}>
			<Radio styled name="gender" label="Gender" options={genderOptions} />
		</Repeater>)));

storiesOf('RichText', module)
	.add('Basic', withInfo()(() =>
		<RichText name="content" label="Content" />))
	.add('Wide', withInfo()(() =>
		<RichText wide name="content" label="Content" />))
	.add('Default value', withInfo()(() =>
		<RichText wide name="content" label="Content" value="<p>Lorem <b>ipsum</b></p>" />));


storiesOf('Select', module)
	.add('Basic', withInfo()(() =>
		<Select name="sizes" label="Available options" options={availableOptions} onChange={action('onChange')} />))
	.add('Default value', withInfo()(() =>
		<Select name="sizes" label="Available options" value="option2" options={availableOptions} onChange={action('onChange')} />))
	.add('Multiple options with default values', withInfo()(() =>
		<Select multiple name="sizes" label="Available options" value={['option1', 'option2']} options={availableOptions} onChange={action('onChange')} />))
	.add('Placeholder', withInfo()(() =>
		<Select placeholder="Select an option" name="sizes" label="Available options" options={availableOptions} onChange={action('onChange')} />))
	.add('Clearable', withInfo()(() =>
		<Select clearable name="sizes" label="Available options" value="option2" options={availableOptions} onChange={action('onChange')} />))
	.add('Disabled', withInfo()(() =>
		<Select disabled name="sizes" label="Available options" value="option2" options={availableOptions} onChange={action('onChange')} />))
	.add('Creatable option', withInfo()(() =>
		<Select multiple creatable name="sizes" label="Available options" value={['option1', 'option2']} options={availableOptions} onChange={action('onChange')} />))
	.add('With floating label', withInfo()(() =>
		<Select withFloatingLabel name="sizes" label="Available options" options={availableOptions} onChange={action('onChange')} />));

storiesOf('Slider', module)
	.add('Basic', withInfo()(() =>
		<Slider name="number" label="Select an hourly rate" options={availableOptions} value={5} onChange={action('onChange')} />))
	.add('With handle', withInfo()(() => (
		<Slider name="number" label="Select an hourly rate (requires production env to update value)" options={availableOptions} value={5} onChange={action('onChange')}>
			<div className="">£5</div>
		</Slider>)));

storiesOf('Tab', module)
	.add('Basic', withInfo()(() =>
		<Tab>
			<div title="Tab 1">
				<span>Foo 1</span>
			</div>
			<div title="Tab 2">
				<span>Foo 2</span>
			</div>
			<div title="Tab 3">
				<span>Foo 3</span>
			</div>
		</Tab>))
	.add('1 Item', withInfo()(() =>
		<Tab>
			<div title="Tab 1">
				<span>Foo 1</span>
			</div>
		</Tab>))
	.add('Array', withInfo()(() =>
		<Tab>
			<div title="Tab 1">
				<span>Foo 1</span>
			</div>
			{availableOptions.map(option => (
				<div key={option.id} title={option.title}>
					{availableOptions.map(option2 => (
						<div key={option2.id} title={option2.title}>
							<span>{option2.title}</span>
						</div>
					))}
				</div>
			))}
		</Tab>))
	.add('Default Tab Open', withInfo()(() =>
		<Tab selectedIndex={2}>
			<div title="Tab 1">
				<span>Foo 1</span>
			</div>
			<div title="Tab 2">
				<span>Foo 2</span>
			</div>
			<div title="Tab 3">
				<span>Foo 3</span>
			</div>
		</Tab>));

storiesOf('Table', module)
	.add('Basic', withInfo()(() =>
		<Table
			headers={['First Name', 'Last Name', 'Age']}
		>
			<tr>
				<td>John</td>
				<td>Doe</td>
				<td>23</td>
			</tr>
			<tr>
				<td>Tom</td>
				<td>Smith</td>
				<td>18</td>
			</tr>
		</Table>));

storiesOf('TextInput', module)
	.add('Basic', withInfo()(() =>
		<TextInput name="firstName" label="First Name" onChange={action('onChange')} />))
	.add('Default value', withInfo()(() =>
		<TextInput name="firstName" label="First Name" value="John" onChange={action('onChange')} />))
	.add('Disabled', withInfo()(() =>
		<TextInput disabled name="firstName" label="First Name" value="John" onChange={action('onChange')} />))
	.add('Append', withInfo()(() =>
		<TextInput append={<span>cm</span>} name="size" label="Size" onChange={action('onChange')} />))
	.add('Prepend', withInfo()(() =>
		<TextInput prepend={<i className="ion-person" />} name="firstName" label="First Name" value="John" onChange={action('onChange')} />))
	.add('Placeholder without label', withInfo()(() =>
		<TextInput prepend={<i className="ion-ios-search-strong" />} name="search" placeholder="Search..." onChange={action('onChange')} />))
	.add('Wide', withInfo()(() =>
		<TextInput wide name="firstName" label="First Name" onChange={action('onChange')} />))
	.add('With floating label', withInfo()(() =>
		<TextInput withFloatingLabel name="firstName" label="First Name" onChange={action('onChange')} />));

storiesOf('TimePicker', module)
	.add('Basic', withInfo()(() =>
		<TimePicker name="eventStart" label="Event Start" onChange={action('onChange')} />))
	.add('Default value', withInfo()(() =>
		<TimePicker name="eventStart" label="Event Start" value="15:00:00" onChange={action('onChange')} />))
	.add('Prepend', withInfo()(() =>
		<TimePicker name="eventStart" label="Event Start" onChange={action('onChange')} prepend={<i className="ion-android-time" />} />))
	.add('Append', withInfo()(() =>
		<TimePicker name="eventStart" label="Event Start" onChange={action('onChange')} append={<i className="ion-android-time" />} />))
	.add('Placeholder', withInfo()(() =>
		<TimePicker name="eventStart" label="Event Start" onChange={action('onChange')} placeholder="Select time" />));

storiesOf('TinyMCE', module)
	.add('Basic', withInfo()(() =>
		<TinyMCE name="content" label="Content" onChange={action('onChange')} />))
	.add('Wide', withInfo()(() =>
		<TinyMCE wide name="content" label="Content" onChange={action('onChange')} />))
	.add('Default value', withInfo()(() =>
		<TinyMCE name="content" value="<p>Lorem <b>ipsum</b></p>" label="Content" onChange={action('onChange')} />));

storiesOf('Tooltip', module)
	.add('Basic', withInfo()(() =>
		<Tooltip icon="£" message="Pound sign" />))
	.add('Custom element', withInfo()(() =>
		<Tooltip icon={<i className="ion-android-volume-off" />} message="Silence is golden" />));
