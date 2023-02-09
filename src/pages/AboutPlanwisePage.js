import { Fragment, useState } from 'react'
import { Disclosure, Menu, Switch, Transition } from '@headlessui/react'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import {
  Bars3Icon,
  BellIcon,
  CogIcon,
  CreditCardIcon,
  KeyIcon,
  SquaresPlusIcon,
  UserCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import lockup_white from '../assets/lockup-white.svg'
import { Link } from "react-router-dom";

export default function AboutPlanwisePage(){
  return (

    <div className="divide-y divide-gray-200 lg:grid lg:grid-cols-9 lg:divide-y-0 lg:divide-x">
      <form className="divide-y divide-gray-200 lg:col-span-9" action="#" method="POST">
        <div className="py-6 px-4 sm:p-6 lg:pb-8">
          <div>
            <h2 className="text-lg font-medium leading-6 text-gray-900">The General Idea:</h2>
            <p className="mt-1 text-sm text-gray-500">
            Here at Planwise™ we believe that time is mankind's most precious resource. So we created Planwise, an intelligent planner and calendar solution with features to maximize your productivity and overall happiness.
            </p>
          </div>
          <div>
            <h2 className="mt-10 text-lg font-medium leading-6 text-gray-900">How Does it Work?</h2>
            <p className="mt-1 text-sm text-gray-500">
            Users can ask Apple's Siri to schedule a task (ex. “Solve P=NP”). Takes a task, and maybe a time, records the task under 'Your Plan' and then adds the task to an available slot on 'Your Calendar'. 
            </p>
          </div>
        </div> 
      </form>
    </div>
)
}