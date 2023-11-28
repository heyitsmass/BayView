'use client';
import React, { Dispatch, SetStateAction } from 'react';
import { faArrowDownShortWide, faArrowRight, faArrowRightArrowLeft, faListUl, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { useCallback, useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import { Offer } from '@duffel/api/types';
import { AnimatePresence, motion } from 'framer-motion';
import InfiniteScroll from 'react-infinite-scroll-component';
import Button from '@/components/Button';
import Card from '@/components/HomePage/Card';
import Select from '@/components/Select';
import { BlurOpacityAnimation } from '@/components/Animations/AnimatePresenceComponent';
import { stepDetails } from '..';
import { FlightContext } from '../flightState';
import { FlightActionInterface, FlightStateInterface } from '../flightInterfaces';
import { getNextSliceFromPartialOfferRequestIDAction, getSingleOfferById } from '../flightActions';

type OfferItemProps = Offer & {
	onToggleSelect: (offerId: string) => void;
	isSelected: boolean;
	isDepartingPresentation: boolean;
};

type FlightStateType = {
	flightState: FlightStateInterface;
	dispatch: React.Dispatch<FlightActionInterface>;
};

type FlightStateSelectType = {
	flightState: FlightStateInterface['selectState'];
	dispatch: React.Dispatch<FlightActionInterface>;
};

type ResultsSortingProps = FlightStateSelectType & {
	sortDataBySortingType: (sortBy: string, currentOffers: Offer[]) => void;
	setCurrentPage: Dispatch<SetStateAction<number>>;
	setCurrentOffers: Dispatch<SetStateAction<Array>>;
	currentOffers: Offer[] | undefined;
	isDepartingPresentation: boolean;
};
type EditSearchDetailsProps = FlightStateType & {
	currentOffers: Offer[] | undefined;
	isDepartingPresentation: boolean;
	handleModifyDeparting: (event) => void;
};

type InlineSVGProps = {
	src?: string;
};

type OffersDisplayProps = {
	flightState: FlightStateInterface;
	itemsPerPage: number;
	currentPage: number;
	loadMoreOffers: () => void;
	displayedOffers: Offer[];
	currentOffers?: Offer[];
	selectedOfferID: string | undefined;
	handleToggleSelect: (offerId: string) => void;
	isDepartingPresentation: boolean;
};

type OfferListProps = {
	displayedOffers: Offer[];
	selectedOfferID: string | undefined;
	handleToggleSelect: (offerId: string) => void;
	isDepartingPresentation: boolean;
};

export default function SelectFlight() {
	const { dispatch, flightState } = useContext(FlightContext);

	// Pagination state
	const itemsPerPage = 10;
	const [currentPage, setCurrentPage] = useState(1);
	const [displayedOffers, setDisplayedOffers] = useState(Array<Offer>);

	// Logic / state for updating the selected offer
	const [selectedOfferID, setSelectedOfferID] = useState<string | undefined>();

	// State for tracking if the presentation is for departing flights
	const [isDepartingPresentation, setIsDepartingPresentation] = useState(false);

	// Initialize currentOffers with an empty array
	const [currentOffers, setCurrentOffers] = useState<Offer[] | undefined>([]);

	// Handle transitioning to confirmation state
	const handleTransitionToConfirmation = (e) => {
		e.preventDefault();
		dispatch({ type: 'SET_STEP', payload: 5 });
	};

	// Handle returning to departing state
	const handleModifyDeparting = (event) => {
		event.preventDefault();

		dispatch({
			type: 'UPDATE_FLIGHT_STATE',
			payload: {
				contentPending: true,
				cardTitle: stepDetails[2].title + flightState.places[1].name,
				cardSubtitle: stepDetails[2].subtitle + flightState.places[0].name,
			},
		});

		setTimeout(() => {
			dispatch({
				type: 'UPDATE_FLIGHT_STATE',
				payload: {
					contentPending: false,
				},
			});

			setIsDepartingPresentation(false);
		}, 1000);
	};

	// Handle departure state changes
	const handleSuccess = async(response) => {

		try {
			// Disabled for now due to error response
			// const updatedOffer = await getSingleOfferById(flightState.selectState.selectedOffer && flightState.selectState.selectedOffer.id || '');

			dispatch({
				type: 'UPDATE_FLIGHT_STATE',
				payload: {
					contentPending: false,
					cardTitle: stepDetails[3].title + flightState.places[0].name,
					cardSubtitle: stepDetails[3].subtitle + flightState.places[1].name,
				},
			});
			dispatch({
				type: 'UPDATE_SELECT_STATE',
				payload: {
					// selectedOffer: {
					// 	...flightState.selectState.selectedOffer,
					// 	offer: updatedOffer
					// },
					returnFlight: {
						...flightState.selectState.returnFlight,
						data: response.data.data,
					},
				},
			});
		} catch (error) {
			// Handle any errors here
			console.error('Server request failed', error);
		} 
	};

	// Transition to the next state
	const handleSubmit = async (event) => {
		event.preventDefault();

		// Update the current state for this component for departures
		if (flightState.roundTrip && selectedOfferID && flightState.selectState.data) {
			// Pending state
			dispatch({
				type: 'UPDATE_FLIGHT_STATE',
				payload: {
					cardTitle: 'Fetching Return Flights to ' + flightState.places[0].name,
					cardSubtitle: 'this should only take a moment',
					contentPending: true,
				},
			});

			try {
				// Await the server action
				const response = await getNextSliceFromPartialOfferRequestIDAction(flightState.selectState.data.id, selectedOfferID);
				setIsDepartingPresentation(true);
				handleSuccess(response);
			} catch (error) {
				// Handle any errors here
				console.error('Server request failed', error);
				alert(error); // TODO: Replace with proper message
			} finally {
				// Reset the pending state
				dispatch({ type: 'UPDATE_FLIGHT_STATE', payload: { contentPending: false } });
			}
		}
		// Else transition to the book/confirm step
		else {
			dispatch({
				type: 'UPDATE_FLIGHT_STATE',
				payload: {
					cardTitle: 'Fetching Return Flights to ' + flightState.places[0].name,
					cardSubtitle: 'this should only take a moment',
					contentPending: true,
				},
			});

			// Wait for half a second for the animation
			setTimeout(() => {
				dispatch({
					type: 'UPDATE_FLIGHT_STATE',
					payload: {
						contentPending: false,
					},
				});
				dispatch({
					type: 'SET_STEP',
					payload: 5,
				});
			}, 500);
		}
	};

	// Handle the selected offer
	const handleToggleSelect = useCallback(
		(offerId) => {
			setSelectedOfferID((currentSelected) => currentSelected === offerId ? null : offerId);
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[isDepartingPresentation, dispatch]
	);

	// Update the sorting
	const sortDataBySortingType = (sortBy: string, currentOffers: Offer[]) => {
		const sortingFunctions = {
			total_amount: (a, b) => Number(a.total_amount) - Number(b.total_amount),
			total_duration: (a, b) => Number(a.total_duration) - Number(b.total_duration),
			airline: (a, b) => a.owner.name.localeCompare(b.owner.name),
		};

		if (currentOffers && sortingFunctions[sortBy]) {
			const sortedOffers = [...currentOffers].sort(sortingFunctions[sortBy]);

			// Update the displayed offers directly with sorted data
			setDisplayedOffers(sortedOffers.slice(0, currentPage * itemsPerPage));
			
			return sortedOffers;
		} else {
			return [];
		}
	};

	const isoDurationToMilliseconds = (duration) => {
		const hoursMatch = duration.match(/(\d+)H/);
		const minutesMatch = duration.match(/(\d+)M/);

		const hours = hoursMatch ? parseInt(hoursMatch[1], 10) : 0;
		const minutes = minutesMatch ? parseInt(minutesMatch[1], 10) : 0;

		return (hours * 60 * 60 + minutes * 60) * 1000;
	};

	// Handler to load more offers
	const loadMoreOffers = () => {

		// Calculate the next set of offers to be displayed
		const nextOffers = currentOffers?.slice(0, currentPage * itemsPerPage);

		// Update the displayed offers
		if (nextOffers) {
			setDisplayedOffers(nextOffers);
			setCurrentPage(currentPage + 1);
		}
	};

	const calculateTotalSegmentDurationAndPrepareOffers = (offers: Offer[] | undefined) => {
		if (!offers) {
			return [];
		}

		// Loop through every offer
		let updatedOffers = offers.map((offer) => {
			// Clone the offer to avoid mutating the original object
			const clonedOffer = { ...offer };

			const totalDuration = clonedOffer.slices.reduce((totalDuration, slice) => {
				// Calculate total duration for the current slice
				const sliceDuration = slice.segments.reduce((duration, segment, index, segments) => {
					// Calculate duration of the current segment accounting for time zone differences as an offset
					let segmentDuration = isoDurationToMilliseconds(segment.duration);

					// Calculate layover duration, if there's a next segment
					if (index < segments.length - 1) {
						const currentSegmentArrival = new Date(segment.arriving_at).getTime();
						const nextSegmentDeparture = new Date(segments[index + 1].departing_at).getTime();
						const layoverTime = nextSegmentDeparture - currentSegmentArrival;

						// Add the layover time to the segment duration
						segmentDuration += layoverTime;
					}

					return duration + segmentDuration;
				}, 0);

				// Convert duration from milliseconds to minutes and add to total duration
				return totalDuration + sliceDuration / 60000;
			}, 0);

			// Update the total duration in the cloned offer
			clonedOffer.total_duration = totalDuration.toString();

			return clonedOffer;
		});

		// Pass the correct sorting type to reflect the changes in the offers
		const sortingType = isDepartingPresentation
			? flightState.selectState.returnFlight.formValues.results_sorting
			: flightState.selectState.formValues.results_sorting;

		// Return the sorted, updated offers
		return sortDataBySortingType(sortingType, updatedOffers);
	};

	// Use effect as update depends on async operation of state mutated from an api request
	useEffect(() => {
		// Determine the current context based on isDepartingPresentation
		const currentContext = isDepartingPresentation ? flightState.selectState.returnFlight : flightState.selectState;

		// Update currentOffers
		if (currentContext.data) {
			setCurrentOffers(calculateTotalSegmentDurationAndPrepareOffers(currentContext.data?.offers));
		}

		// Update selectedOfferID
		const selectedOfferId = currentContext.selectedOffer?.id;
		setSelectedOfferID(selectedOfferId || undefined);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isDepartingPresentation, flightState.selectState.returnFlight.data?.offers, flightState.selectState.data?.offers]);

	useEffect(() => {
		const offer = currentOffers && currentOffers.find(record => record.id === selectedOfferID);
		if (isDepartingPresentation) {
			// Update only the returning offer when isDepartingPresentation is true
			dispatch({
				type: 'UPDATE_SELECTED_RETURNING_OFFER',
				payload: { id: selectedOfferID, offer: offer },
			});
		} else {
			// Update the departing offer
			dispatch({
				type: 'UPDATE_SELECTED_DEPARTING_OFFER',
				payload: { id: selectedOfferID, offer: offer },
			});

			// Clear the returning offer if the offerId changes from what was already stored
			if ((flightState.selectState.selectedOffer && flightState.selectState.selectedOffer.id) !== selectedOfferID) {
				dispatch({
					type: 'UPDATE_SELECTED_RETURNING_OFFER',
					payload: { id: null, offer: null },
				});
			}
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedOfferID])

	return (
		<form className="m-1">
			<BlurOpacityAnimation transitionOn={flightState.contentPending}>
				<AnimatePresence>
					<div className="flex flex-row justify-between items-center">
						<div className="w-3/6 min-w-[200px]">
							<ResultsSorting
								flightState={flightState.selectState}
								setCurrentPage={setCurrentPage}
								setCurrentOffers={setCurrentOffers}
								dispatch={dispatch}
								sortDataBySortingType={sortDataBySortingType}
								currentOffers={currentOffers}
								isDepartingPresentation={isDepartingPresentation}
							/>
						</div>
						<div className="w-3/6 min-w-[250px] ml-4">
							<EditSearchDetails
								flightState={flightState}
								isDepartingPresentation={isDepartingPresentation}
								currentOffers={currentOffers}
								dispatch={dispatch}
								handleModifyDeparting={handleModifyDeparting}
							/>
						</div>
					</div>
				</AnimatePresence>
				<OffersDisplay
					flightState={flightState}
					itemsPerPage={itemsPerPage}
					currentPage={currentPage}
					loadMoreOffers={loadMoreOffers}
					displayedOffers={displayedOffers}
					currentOffers={currentOffers}
					selectedOfferID={selectedOfferID}
					handleToggleSelect={handleToggleSelect}
					isDepartingPresentation={isDepartingPresentation}
				/>
			</BlurOpacityAnimation>
			{!isDepartingPresentation ? (
				<Button
					{...(!selectedOfferID && { disabled: true })}
					onClick={handleSubmit}
					variant="secondary"
					className="!mt-4 transition-all ease-in"
					pending={flightState.contentPending ? 'true' : undefined}
				>
					{!selectedOfferID ? 'Select to Continue' : 'Continue with Selected'}
				</Button>
			) : (
				<div className="flex">
					<Button
						{...(!selectedOfferID && { disabled: true })}
						onClick={handleTransitionToConfirmation}
						variant="secondary"
						className="!mt-4 transition-all ease-in"
						pending={flightState.contentPending ? 'true' : undefined}
					>
						{!selectedOfferID ? 'Select to Continue' : 'Confirm Itinerary'}
					</Button>
				</div>
			)}
		</form>
	);
}

const OfferList = React.memo(({ displayedOffers, selectedOfferID, handleToggleSelect, isDepartingPresentation }: OfferListProps) => {
	return displayedOffers.map((offer) => (
		<OfferItem
			key={offer.id}
			isSelected={selectedOfferID === offer.id}
			onToggleSelect={handleToggleSelect}
			isDepartingPresentation={isDepartingPresentation}
			{...offer}
		/>
	));
});
OfferList.displayName = 'OfferList';

const OffersDisplay = React.memo(
	({
		flightState,
		itemsPerPage,
		currentPage,
		loadMoreOffers,
		displayedOffers,
		currentOffers,
		selectedOfferID,
		handleToggleSelect,
		isDepartingPresentation,
	}: OffersDisplayProps) => {
		return (
			<div id="scrollArea" className={`!my-4 relative max-h-80 overflow-auto`}>
				{flightState.selectState.data && flightState.selectState.data.offers.length > 0 ? (
					<InfiniteScroll
						dataLength={itemsPerPage * currentPage}
						next={loadMoreOffers}
						hasMore={displayedOffers.length < (currentOffers ? currentOffers.length : 0)}
						loader={<h4 className="text-center p-4 w-100">Loading...</h4>}
						endMessage={
							<>
								<p className="text-center text-zinc-400">
									End of List <span className="text-2xl pl-2">🛫</span>
								</p>
								<p className="text-center mb-2">
									<span className="text-lg text-zinc-400">●</span>
								</p>
							</>
						}
						scrollableTarget="scrollArea"
					>
						<OfferList
							displayedOffers={displayedOffers}
							selectedOfferID={selectedOfferID}
							handleToggleSelect={handleToggleSelect}
							isDepartingPresentation={isDepartingPresentation}
						/>
					</InfiniteScroll>
				) : (
					<Card className="!bg-zinc-50 dark:!bg-zinc-700 dark:!border-zinc-500 !px-5">
						<div>
							<p className="text-center">No offers available at this time❗</p>
						</div>
					</Card>
				)}
			</div>
		);
	}
);
OffersDisplay.displayName = 'OffersDisplay';

const FAIcon = React.memo(({ ...props }: FontAwesomeIconProps) => {
	return <FontAwesomeIcon {...props} />;
});
FAIcon.displayName = 'FAIcon';

// Edit details section
const EditSearchDetails = React.memo(
	({ flightState, dispatch, currentOffers, isDepartingPresentation, handleModifyDeparting }: EditSearchDetailsProps) => {
		const prettyPrintDate = dateString => {
			const d = new Date(dateString);
			return `${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getDate().toString().padStart(2, '0')}/${d.getFullYear().toString().slice(-2)}`;
		};

		return (
			<motion.div>
				<Card className="p-0 dark:!border-zinc-500">
					<div className="flex justify-around items-center w-full p-0">
						{flightState.searchState.formValues?.origin ? (
							!isDepartingPresentation ? (
								<>
									<div className="w-4/6 justify-between text-sm pl-2">
										{flightState.searchState.formValues?.number_of_passengers == 1 && <h6>1 Passenger</h6>}
										{flightState.searchState.formValues?.number_of_passengers > 1 && (
											<h6>{flightState.searchState.formValues.number_of_passengers} Passengers</h6>
										)}
										<div className="flex-row">
											<div className="flex text-zinc-400">
												<h6 className="text-sm">{flightState.searchState.formValues.class.toLocaleUpperCase()}</h6>
											</div>
											<div className="flex text-zinc-400">
												<h6 className="text-sm">{flightState.places[0].iata_code} </h6>
												<FAIcon className="w-3 mt-1 px-0.5" size="sm" icon={flightState.roundTrip ? faArrowRightArrowLeft : faArrowRight} />
												<h6 className="text-sm"> {flightState.places[1].iata_code}</h6>
											</div>
											<div className="flex text-zinc-400">
												<h6 className="text-sm">{prettyPrintDate(flightState.searchState.formValues?.departure_date)} </h6>
												{flightState.roundTrip && (
													<>
														<FAIcon className="w-3 px-0.5 mt-1" size="sm" icon={faArrowRight} />
														<h6 className="text-sm">
															{' '}
															{flightState.searchState.formValues?.return_date &&
																prettyPrintDate(flightState.searchState.formValues?.return_date)}
														</h6>
													</>
												)}
											</div>
										</div>
									</div>
									<div className="w-3/6 flex align-top justify-center">
										<Button
											onClick={(e) => {
												e.preventDefault();
												dispatch({ type: 'SET_STEP', payload: 1 });
											}}
											variant="primary"
											icon={faPenToSquare}
											style={{ fontFamily: 'var(--font-barlow-semi-condensed)' }}
										>
											Edit
										</Button>
									</div>
								</>
							) : (
								<>
									<div className="flex w-full justify-around m-1 mx-auto">
										<div className="w-3/6 text-sm pl-2">
											<h6 className="font-semibold">Departing Flight</h6>

											<div className="flex-row">
												<div className="flex text-zinc-400">
													<h6 className="text-sm">{flightState.searchState.formValues.class.toLocaleUpperCase()}</h6>
												</div>
												<div className="flex text-zinc-400">
													<h6 className="text-sm">{flightState.places[0].iata_code} </h6>
													<FAIcon
														className="w-3 mt-1 px-0.5"
														size="sm"
														icon={flightState.roundTrip ? faArrowRightArrowLeft : faArrowRight}
													/>
													<h6 className="text-sm"> {flightState.places[1].iata_code}</h6>
												</div>
												<div className="flex text-zinc-400">
													<h6 className="text-sm">{prettyPrintDate(flightState.searchState.formValues?.departure_date)} </h6>
													{flightState.roundTrip && (
														<>
															<FAIcon className="w-3 px-0.5 mt-1" size="sm" icon={faArrowRight} />
															<h6 className="text-sm">
																{' '}
																{flightState.searchState.formValues?.return_date &&
																	prettyPrintDate(flightState.searchState.formValues?.return_date)}
															</h6>
														</>
													)}
												</div>
											</div>
										</div>
										<div className="w-3/6 flex align-top justify-center">
											<Button
												onClick={handleModifyDeparting}
												variant="primary"
												className="transition-all ease-in"
												icon={faListUl}
												pending={flightState.contentPending ? 'true' : undefined}
											>
												Change
											</Button>
										</div>
									</div>
								</>
							)
						) : (
							<>
								<div className="w-4/6 text-sm pl-2">
									<div>
										<h6>Search Not Specified</h6>
									</div>
								</div>
								<div className="w-3/6 flex align-top justify-center">
									<Button
										onClick={(e) => {
											e.preventDefault();
											dispatch({ type: 'SET_STEP', payload: 1 });
										}}
										variant="primary"
										icon={faPenToSquare}
										style={{ fontFamily: 'var(--font-barlow-semi-condensed)' }}
									>
										Edit
									</Button>
								</div>
							</>
						)}
					</div>
				</Card>
			</motion.div>
		);
	}
);
EditSearchDetails.displayName = 'EditSearchDetails';

// Results and sort
const ResultsSorting = React.memo(
	({ flightState, dispatch, sortDataBySortingType, isDepartingPresentation, currentOffers, setCurrentOffers }: ResultsSortingProps) => {
		const updateSortType = (e) => {
			const sortBy = e.target.value;

			!isDepartingPresentation
				? dispatch({
						type: 'UPDATE_SELECT_STATE',
						payload: {
							formValues: {
								results_sorting: sortBy,
							},
						},
				  })
				: dispatch({
						type: 'UPDATE_SELECT_STATE',
						payload: {
							returnFlight: {
								formValues: {
									results_sorting: sortBy,
								},
							},
						},
				  });
		    
			// Reset page to ensure we get the accurate results after sorting change, must be in this order.
			setCurrentOffers(sortDataBySortingType(sortBy, currentOffers ? currentOffers : [])); // Sort all offers
		};

		return (
			<motion.div>
				<Select
					style={{ fontFamily: 'var(--font-barlow-semi-condensed)' }}
					className="font-medium"
					label={`${currentOffers ? currentOffers.length : 0} Results Sorting By`}
					icon={{ icon: faArrowDownShortWide }}
					value={!isDepartingPresentation ? flightState.formValues?.results_sorting : flightState.returnFlight.formValues?.results_sorting}
					options={
						!isDepartingPresentation
							? [
									{ value: 'total_amount', label: 'Lowest Price' },
									{ value: 'total_duration', label: 'Shortest Duration' },
									{ value: 'airline', label: 'Airline' },
							  ]
							: [
									{ value: 'total_amount', label: 'Lowest Price' },
									{ value: 'total_duration', label: 'Shortest Duration' },
							  ]
					}
					name="results_sorting"
					onChange={updateSortType}
				></Select>
			</motion.div>
		);
	}
);
ResultsSorting.displayName = 'ResultsSorting';

// Offer component for use in list
const OfferItem = React.memo(({ onToggleSelect, isSelected, isDepartingPresentation, ...offer }: OfferItemProps) => {
	const handleClick = (event) => {
		event.preventDefault();
		onToggleSelect(offer.id);
	};

	const formatISO8601ToTime = (isoString) =>
		new Date(isoString).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });

	const formatDurationToHoursMinutes = (totalMinutes) => {
		let hours = Math.floor(totalMinutes / 60);
		let minutes = totalMinutes % 60;

		return (hours ? `${hours}hr ` : '') + (minutes ? `${minutes}min` : hours ? '' : '0min');
	};

	const formatStops = (stopsString) => {
		switch (stopsString) {
			case 0:
				return 'Nonstop';
			case 1:
				return '1 Stop';
			default:
				return stopsString + ' Stops';
		}
	};

	const calculateTotalStopsFromSlices = (slices) => {
		return slices.reduce((totalStops, slice) => {
			// Each slice contains segments; the number of stops is one less than the number of segments
			const stopsInSlice = slice.segments.length - 1;
			return formatStops(totalStops + stopsInSlice);
		}, 0);
	};

	return (
		<>
			<motion.button onClick={handleClick} whileTap={{ scale: 0.95 }} className="w-full" key={offer.id}>
				<Card
					className={`w-full ${
						isSelected ? 'ring-4 ring-red-500 ring-inset' : ''
					} "!bg-zinc-50 dark:!bg-zinc-700 dark:!border-zinc-500 !px-5 mb-3 !py-4 hover:!border-red-500`}
				>
					<div className="flex items-center" style={{ fontFamily: 'var(--font-barlow-semi-condensed)' }}>
						<div className="flex justify-center items-center w-1/12">
							<InlineSVG src={offer.owner.logo_symbol_url}></InlineSVG>
						</div>
						<div className="flex flex-col justify-center w-10/12 px-8 text-left">
							<div className="flex justify-between">
								<div className="flex-col justify-start">
									<h1>
										{formatISO8601ToTime(offer.slices[0].segments[0].departing_at)} {' - '}
										{formatISO8601ToTime(offer.slices[offer.slices.length - 1].segments[offer.slices.length - 1].arriving_at)}
									</h1>
									<h1 className="text-zinc-400 text-sm">{offer.owner.name}</h1>
								</div>
								<div className="flex-col">
									<h1>{formatDurationToHoursMinutes(offer.total_duration)}</h1>
									<h1 className="text-zinc-400 text-sm">
										{offer.slices[0].segments[0].origin.iata_code} <FAIcon className="w-3 px-0.5" size="lg" icon={faArrowRight} />{' '}
										{
											offer.slices[offer.slices.length - 1].segments[offer.slices[offer.slices.length - 1].segments.length - 1].destination
												.iata_code
										}
									</h1>
								</div>
								<div className="flex-col">
									<h1>{calculateTotalStopsFromSlices(offer.slices)}</h1>
									<h1 className="text-zinc-400 text-sm"></h1>
								</div>
							</div>
						</div>
						<div className="flex justify-center items-center w-2/12">
							<h1 className="font-bold">${offer.total_amount}</h1>
						</div>
					</div>
				</Card>
			</motion.button>
		</>
	);
});
OfferItem.displayName = 'OfferItem';

const InlineSVG = React.memo(({ src }: InlineSVGProps) => {
	return <object width={28} height={28} data={src} type="image/svg+xml" aria-label="Airline logo"></object>;
});
InlineSVG.displayName = 'InlineSVG';
