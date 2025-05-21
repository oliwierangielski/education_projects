//
//  PhotosCollectionViewController.swift
//  Galeria
//
//  Created by Oliwier Angielski on 17/04/2024.
//

import UIKit
import CoreImage

private let reuseIdentifier = "Cell"



class PhotosCollectionViewController: UICollectionViewController {
    var grainValue = 0.0
    private var photos : [Photo] = [ Photo(image: "1", name: "1"),
                                     Photo(image: "2", name: "2"),
                                     Photo(image: "3", name: "3"),
                                     Photo(image: "4", name: "4"),
                                     Photo(image: "5", name: "5"),
                                     Photo(image: "6", name: "6"),
                                     Photo(image: "7", name: "7"),
                                     Photo(image: "8", name: "8"),
                                     Photo(image: "9", name: "9"),
                                     Photo(image: "10", name: "10"),
                                     Photo(image: "11", name: "11"),
                                     Photo(image: "12", name: "12"),
                                     Photo(image: "13", name: "13"),
                                     Photo(image: "14", name: "14"),
                                     Photo(image: "15", name: "15"),
                                     Photo(image: "16", name: "16"),
                                     Photo(image: "17", name: "17"),
                                     Photo(image: "18", name: "18")]
    
    

    override func viewDidLoad() {
        super.viewDidLoad()
        addGesture()

        // Uncomment the following line to preserve selection between presentations
        // self.clearsSelectionOnViewWillAppear = false

        // Register cell classes
//        self.collectionView!.register(UICollectionViewCell.self, forCellWithReuseIdentifier: reuseIdentifier)

        // Do any additional setup after loading the view.
    }

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using [segue destinationViewController].
        // Pass the selected object to the new view controller.
    }
    */

    // MARK: UICollectionViewDataSource

    override func numberOfSections(in collectionView: UICollectionView) -> Int {
            return 1
        }


        override func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
            
            return photos.count
        }
    
    func reloadCollectionView(){
        collectionView.reloadData()
    }

        override func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
            let cell = collectionView.dequeueReusableCell(withReuseIdentifier: "dataCell", for: indexPath) as! PhotosCollectionViewCell
        
            
            let photo = photos[indexPath.row]
//            let image = UIImage(named: photo.image)
            
            if let newImage = UIImage(named: photo.image),
               let ciImage = CIImage(image: newImage) {
                let filter = CIFilter(name: "CIGaussianBlur")
                
                filter?.setValue(ciImage, forKey: kCIInputImageKey)
//                let grainValue: CGFloat = 5.0
                filter?.setValue(self.grainValue, forKey: kCIInputRadiusKey)
                if let outputImage = filter?.outputImage {
                    let context = CIContext(options: nil)
                    if let cgImage = context.createCGImage(outputImage, from: outputImage.extent) {
                        let processedImage = UIImage(cgImage: cgImage)
                        cell.photoImageView.image = processedImage
                    }
                }
            }
            
//            cell.photoImageView.image = UIImage(named: photo.image)
            cell.photoNameLabel.text = photo.name
        
            return cell
        }

    // MARK: UICollectionViewDelegate

    /*
    // Uncomment this method to specify if the specified item should be highlighted during tracking
    override func collectionView(_ collectionView: UICollectionView, shouldHighlightItemAt indexPath: IndexPath) -> Bool {
        return true
    }
    */

    /*
    // Uncomment this method to specify if the specified item should be selected
    override func collectionView(_ collectionView: UICollectionView, shouldSelectItemAt indexPath: IndexPath) -> Bool {
        return true
    }
    */

    /*
    // Uncomment these methods to specify if an action menu should be displayed for the specified item, and react to actions performed on the item
    override func collectionView(_ collectionView: UICollectionView, shouldShowMenuForItemAt indexPath: IndexPath) -> Bool {
        return false
    }

    override func collectionView(_ collectionView: UICollectionView, canPerformAction action: Selector, forItemAt indexPath: IndexPath, withSender sender: Any?) -> Bool {
        return false
    }

    override func collectionView(_ collectionView: UICollectionView, performAction action: Selector, forItemAt indexPath: IndexPath, withSender sender: Any?) {
    
    }
    */
    
    private func addGesture(){
        let pinchGesture = UIPinchGestureRecognizer(target: self, action: #selector(didPinch(_:)))
        view.addGestureRecognizer(pinchGesture)
    }
    
    @objc private func didPinch(_ gesture: UIPinchGestureRecognizer){
        if gesture.state == .changed {
            self.grainValue = gesture.scale*10
            self.reloadCollectionView()
//            print(scale)
        }
    }

}
