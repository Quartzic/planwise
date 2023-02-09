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

export default function ContactUsPage(){
  return (
    <div className="divide-y divide-gray-200 lg:grid lg:grid-cols-9 lg:divide-y-0 lg:divide-x">
      <form className="divide-y divide-gray-200 lg:col-span-9" action="#" method="POST">  
        <div className="py-6 px-4 sm:p-6 lg:pb-8">
          <div>
            <h2 className="text-lg font-medium leading-6 text-gray-900">Email Us</h2>
            <p className="mt-1 text-sm text-gray-500">
            whatever@Planwise.tech
            </p>
          </div>
        </div>
      </form>
    </div>
)
}